import User from '../database/models/user.js';

const logoutController = async (req, res) => {
  console.log('Beginning logout controller...');
  // Get the user id from the request
  const userId = req.user;
  console.log('The user ID is: ', userId);

  // Find the user in the database by their id
  const user = await User.findById(userId);
  console.log('User found by ID: ', user);

  // Remove the token from the user's tokens array
  user.tokens = user.tokens.filter((t) => t !== req.token);
  await user.save();

  // Send a success message as the response
  res.send({ message: 'Successfully logged out' });
};

export default logoutController;
