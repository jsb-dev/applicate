import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const authMiddleware = async (req, res, next) => {
  console.log('Middleware called');
  console.log('Auth request header: ', req.header('Authorization'));
  // Get the token from the request header or cookie
  let token;
  try {
    if (req.header('Authorization')) {
      token = req.header('Authorization').split(' ')[1];
      console.log('token = ', token);
    } else {
      token = req.cookies.authToken;
    }

    if (!token) {
      throw new Error('Access denied. No token provided');
    }
  } catch (error) {
    // If there is an error, return a 401 error
    res.status(401).send({ error: error.message });
  }

  // If no token is provided, return a 401 error
  if (!token) {
    return res.status(401).send({ error: 'Access denied. No token provided' });
  }

  // If a token is provided, try to decode and verify it
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decoded = ', decoded);
    req.user = decoded._id;
    console.log('req.user = ', req.user);
    next();
  } catch (error) {
    // Token is invalid, return an error
    res.status(401).send({ error: 'Invalid token' });
  }
};

export default authMiddleware;
