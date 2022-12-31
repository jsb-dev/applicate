import User from '../database/models/user.js';

const logoutController = async (req, res) => {
  // Get the user id from the request
  const userId = req.user;

  // Find the user in the database by their id
  const user = await User.findById(userId);

  // Remove the token from the user's tokens array
  user.tokens = [];
  await user.save();

  // Send a success message as the response
  res.send({ message: 'Successfully logged out', user });
  console.log('User ', user.email, ' successfully logged out');
};

export default logoutController;
