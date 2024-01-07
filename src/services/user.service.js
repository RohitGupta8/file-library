import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fileUploadData from "../models/file.model";
import rabbitMQ from '../utils/rabbitMQServer';
import {jwtTokenVerifyMail,generateToken} from '../utils/user.util';


//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};



//create new user
export const newUser = async (body) => {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(body.password, salt)
  body.password = hash
  const data = await User.create(body);
  if (data) {
    jwtTokenVerifyMail(data)
  }
  return data;
};


//update single user
export const updateUser = async (_id, body) => {
  const data = await User.findByIdAndUpdate({_id}, body, {new: true});
  return data;
};


//delete single user
export const deleteUser = async (id) => {
  try {
    // Delete the user
    await User.findByIdAndDelete(id);

    // Delete associated files
    await fileUploadData.deleteMany({userId: id});

    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


//get single user
export const getUser = async (id) => {
  const data = await User.findById(id);
  return data;
};



export const loginUser = async (body) => {
  const check = await User.findOne({mail: body.mail});
  if (!check) {
    throw new Error('User not registered....');
  }
  if (check.verified) {
    const match = await bcrypt.compare(body.password, check.password);
    if (match) {
      const user = {mail: check.mail, phone: check.phone, id: check._id, role: check.role}
       return generateToken(user)
    } else {
      throw new Error('Incorrect Password');
    }
  } else {
    throw new Error('Account not verified .....');
  }
};


export const verifyUser = async (token) => {
  try {
    const decode = jwt.verify(token, process.env.SECRET);
    if (!decode) {
      throw new Error('Invalid token');
    }
    const response = await rabbitMQ.receiver(decode.mail);
    if (!response) {
      throw new Error('Error receiving response from RabbitMQ');
    }
    const updatedData = await User.findOneAndUpdate(
      { mail: decode.mail },
      { verified: true },
      { new: true }
    );

    return updatedData;
  } catch (error) {
    console.error("Error in verifyUser:", error);
    throw error;
  }
};

