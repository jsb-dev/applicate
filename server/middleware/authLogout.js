import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const authLogoutMiddleware = async (req, res, next) => {
  // Set a flag to track whether a response has been sent or not
  let responseSent = false;

  // Get the token from the request header or cookie
  let token;
  try {
    if (req.header('Authorization')) {
      token = req.header('Authorization').split(' ')[1];
    } else {
      token = req.cookies.authToken;
    }

    if (!token) {
      responseSent = true;
      throw new Error('No token provided, user is already logged out.');
    }
  } catch (error) {
    // If there is an error, return a 401 error if a response has not been sent yet
    if (!responseSent) {
      res.status(401).send({ error: error.message });
      responseSent = true;
    }
  }

  // If no token is provided, return a 401 error
  if (!token) {
    return res
      .status(401)
      .send({ error: 'No token provided, user is already logged out.' });
  }

  // If a token is provided, try to decode and verify it
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded._id;
    next();
  } catch (error) {
    // Token is invalid, return an error
    res.status(401).send({ error: 'Invalid token' });
  }
};

export default authLogoutMiddleware;
