import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const resetAuthController = (req, res) => {
  dotenv.config();

  const { auth } = req.body;

  try {
    jwt.verify(auth, process.env.JWT_SECRET);
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Invalid Token',
    });
  }
};

export default resetAuthController;
