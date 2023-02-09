import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../../database/models/user.js';

const passwordController = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id });
    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'User not found',
        message: 'Please log in again to continue',
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
      message: 'Please log in again to continue',
    });
  }
};

export default passwordController;
