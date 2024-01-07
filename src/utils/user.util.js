import jwt from 'jsonwebtoken';
import rabbitMQ from '../utils/rabbitMQServer';
import nodemailer from 'nodemailer';



const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'filelibrary.rg@gmail.com',
      pass: 'msff ljjx rtii jgzc',
    },
  });
};



export const generateToken = (data) => {
  return jwt.sign(data, process.env.SECRET, {expiresIn: '500h'});
};



const sendWelcomeMail = async (data) => {
  try {
    const transporter = createTransporter();

    const info = await transporter.sendMail({
      from: '"File Library" <no-reply@filelibrary.com>',
      to: data.mail,
      subject: 'Welcome - File Library Account',
      text: `Hello ${data.name}. Welcome to File Library. Your account has been created successfully.`,
      html: `<b>Hello ${data.name}<br><h2>Welcome to File Library.</h2><br>Your account has been created successfully.<br></b>`,
    });
    return info.response;
  } catch (err) {
    console.error('Error sending welcome mail:', err);
  }
};



const verifyMail = async (token, data) => {
  const link = `http://localhost:${process.env.APP_PORT}/api/${process.env.API_VERSION}/users/verify/${token}`;
  const transporter = createTransporter();

  try {
    const info = await transporter.sendMail({
      from: '"File Library" <no-reply@filelibrary.com>',
      to: data.mail,
      subject: 'Verify Mail for your File Library Account',
      html: `<b>Hello <h2>${data.name.toUpperCase()},</h2><br>
      <h1>Here is your link to Verify Mail:</h1><br>
      <button style="background-color: #4CAF50; border: none; color: white; padding: 10px; text-align: center; border-radius: 12px; text-decoration: none;
        display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;
        transition: background-color 0.3s ease, transform 0.3s ease; /* Add animation properties */"
        onmouseover="this.style.color='#0F0'; this.style.transform='scale(1.1)';" 
        onmouseout="this.style.color='#FFF'; this.style.transform='scale(1)';"
        onmousedown="this.style.backgroundColor='#45a049';" 
        onmouseup="this.style.backgroundColor='#4CAF50';">
        <a href="${link}" style="text-decoration: none; color: white; display: block; height: 100%; width: 100%;">
          click me for Verify
        </a>
      </button></b>
      `});

    return info.response;
  } catch (err) {
    console.error('Error sending verification mail:', err);
    return false;
  }
};


export const jwtTokenVerifyMail = async (data) => {
  try {
    sendWelcomeMail(data);
    const token = generateToken({mail: data.mail})
    if (token) {
      rabbitMQ.sender(data, data.mail);
      await verifyMail(token, data);
    } else {
      return false;
    }
  } catch (error) {
    console.error('Unhandled error:', error);
    return false;
  }
};
