import User from '../database/models/user.js';
import bcrypt from 'bcryptjs';

const loginController = async (req, res) => {
  // Get the email and password from the request body
  const { email, password } = req.body;

  // Find the user in the database by email
  const user = await User.findOne({ email });
  if (!user) {
    // If the user is not found, return a 401 error
    return res.status(401).send({ error: 'Invalid email or password' });
  }

  // Compare the provided password with the hashed password in the database
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    // If the passwords do not match, return a 401 error
    return res.status(401).send({ error: 'Invalid email or password' });
  }

  // If the email and password are valid, generate an auth token for the user
  const token = user.generateAuthToken();

  // Send the user and token as the response
  res
    .cookie('authToken', token, {
      maxAge: 86400 * 1000, // expires in 1 day
      httpOnly: true,
    })
    .set('Authorization', `Bearer ${token}`) // Set the Authorization header in case cookies are off
    .send({ message: 'Successfully logged in', user, token });
};

export default loginController;
