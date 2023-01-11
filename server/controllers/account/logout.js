import User from '../../database/models/user.js';

const logoutController = async (req, res) => {
  try {
    const userId = req.body.userId;
    const token = req.headers.authorization.split(' ')[1];
    const user = await User.findOne({ _id: userId });
    try {
      user.tokens = user.tokens.filter((userToken) => userToken !== token);
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
