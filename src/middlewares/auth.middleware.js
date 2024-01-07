import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  try {

   

    let bearerToken = req.header('Authorization');

    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    const {id, mail, phone, role} = jwt.verify(bearerToken, process.env.SECRET);
    const user = {id, mail, phone, role}

    const users = await User.findById(user.id);
    if (!users) {
      return res.status(401).json({
        message: 'User has been deleted'
      });
    }

    req.user = user;
    res.locals.token = bearerToken;
    next();
  } catch (error) {
    next(error);
  }
};

export const setRole = (role) => {
  return (req, res, next) => {
    req.body.role = role;
    next();
  };
};


export const isAdmin = (req, res, next) => {
  let bearerToken = req.header('Authorization');
  bearerToken = bearerToken.split(' ')[1];
  const user = jwt.verify(bearerToken, process.env.SECRET);
  const role = user.role;
  if (role === 'admin') {
    next();
  } else {
    return res.send({
      message: 'You are not authorized to make this request'
    });
  }
};