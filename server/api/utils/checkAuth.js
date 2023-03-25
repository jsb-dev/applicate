import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../database/models/user.js';

dotenv.config();

function checkAuth(req, res, next) {
  const token = req.headers['authorization'].split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: No token provided',
      message: 'Unauthorized: Please log in or sign up to gain access',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    User.findOne({ _id: decoded._id }).then((user) => {
      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Unauthorized: Token invalid',
          message: 'Unauthorized: Please log in or sign up to gain access',
        });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message,
      message:
        'Something went wrong, please try again. Contact support if this issue persists',
    });
  }
}

export default checkAuth;
