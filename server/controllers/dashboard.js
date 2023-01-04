import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../database/models/user.js';

dotenv.config();

function dashboardAuth(req, res, next) {
  // Get the token from the request header
  const token = req.headers['authorization'];
  const tokenWithoutBearer = token.split(' ')[1];

  // If no token is found, return an error response
  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized: No token provided',
    });
  }

  // If a token is found, try to verify it
  try {
    // Verify the token and get the decoded payload
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);

    // Check if the decoded token is in the database
    User.findOne({ _id: decoded._id }).then((user) => {
      if (!user) {
        return res.status(401).json({
          message: 'Unauthorized: Token invalid',
        });
      }

      // If the token is valid, set the user in the request object
      // and call the next middleware function
      req.user = user;
      next();
    });
  } catch (error) {
    // If there is an error verifying the token, return an error response
    return res.status(401).json({
      message: 'Unauthorized: Token invalid',
    });
  }
}

export default dashboardAuth;
