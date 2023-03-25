import jwt from 'jsonwebtoken';
import User from '../../../database/models/user.js';

const logoutController = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id }).exec();
    try {
      user.tokens = [];
    } catch (error) {
      res.status(400).send({
        success: false,
        error: error.message,
        message: 'User is already logged out. Please log in.',
      });
    }
    await user.save();
    res.send({ success: true, message: 'Successfully logged out' });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message,
      message:
        'Something went wrong, please try again. Contact support if this issue persists',
    });
  }
};

export default logoutController;
