import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from '../../database/models/user.js';

const resetPassController = async (req, res) => {
  const { auth, newPassword } = req.body;

  dotenv.config();

  try {
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
        message:
          'The user associated with this reset password link could not be found',
      });
    }

    const isMatch = await bcrypt.compare(newPassword, user.password);

    if (isMatch) {
      return res.status(400).json({
        success: false,
        error: 'Passwords match',
        message: 'The new password cannot be the same as the old password',
      });
    }

    if (newPassword.length < 7) {
      return res.status(400).send({
        success: false,
        error: 'Password too short',
        message: 'Password must be at least 7 characters long',
      });
    }

    if (newPassword.match(/[\(\){}\[\]|`¬¦! "£\$%\^&\*"<>:;#~_\-+=,@]/g)) {
      return res.status(400).send({
        success: false,
        error: 'Password contains invalid characters',
        message:
          'Password must not contain any of these characters: (){}[]|`¬¦! "£$%^&*"<>:;#~_-+=,@',
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.tokens = [];
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Password reset successfully',
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: 'Invalid token',
      message:
        'The authorization for this Reset Password link is invalid, or has expired. Please return to the Log In page and click Reset Password for a new link, or contact support if this issue persists',
    });
  }
};

export default resetPassController;
