import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../../../database/models/user.js';
import dotenv from 'dotenv';

const passwordController = async (req, res) => {
  dotenv.config();
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id });
    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'User not found',
        message:
          'User not found. Please log out, come back and try again, or contact support if this issue persists.',
      });
    }

    const isMatch = await bcrypt.compare(
      req.body.currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: 'Password mismatch',
        message:
          'The current password you entered is incorrect, please check again',
      });
    }

    if (req.body.newPassword.length < 7) {
      return res.status(400).send({
        success: false,
        error: 'Password too short',
        message: 'Password must be at least 7 characters long',
      });
    }

    if (
      req.body.newPassword.match(/[\(\){}\[\]|`¬¦! "£\$%\^&\*"<>:;#~_\-+=,@]/g)
    ) {
      return res.status(400).send({
        success: false,
        error: 'Password contains invalid characters',
        message:
          'Password must not contain any of these characters: (){}[]|`¬¦! "£$%^&*"<>:;#~_-+=,@',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
    user.password = hashedPassword;
    user.tokens = [];
    await user.save();
    return res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: 'Invalid token',
      message:
        'Something went wrong. Please log out, come back and try again, or contact support if this issue persists.',
    });
  }
};

export default passwordController;
