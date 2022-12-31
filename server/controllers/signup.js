import User from '../database/models/user.js';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const signupController = async (req, res) => {
  // Get the email and password from the request body
  const { email, password } = req.body;

  // Check if the email address is already in use
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).send({ error: 'Email already in use' });
  }

  // Validate the email address
  if (!validator.isEmail(email)) {
    return res.status(400).send({ error: 'Invalid email address' });
  }

  // Check the length of the password
  if (password.length < 7) {
    console.error('Password must be at least 7 characters long');
    return res
      .status(400)
      .send({ error: 'Password must be at least 7 characters long' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Create a new user with the hashed password
    const user = new User({ email, password: hashedPassword });

    // Generate an auth token for the user and push it to the user's tokens array
    const token = await user.generateAuthToken();
    user.tokens.push(token);

    // Save the user to the database
    await user.save();

    // Send the user and token as the response
    res
      .status(201)
      .cookie('authToken', token, {
        maxAge: 86400 * 1000, // expires in 1 day
        httpOnly: true,
      })
      .set('Authorization', `Bearer ${token}`) // Set the Authorization header in case cookies are off
      .send({ message: 'Successfully logged in', user, token });

    // Confirm that the POST request was successful
    console.log('Signup POST request successful');

    // Log the user to the console
    console.log('New user email: ', user.email);
  } catch (error) {
    // If there was an error saving the user, send a 400 error
    console.log(error);
    res.status(400).send(error);
  }
};

export default signupController;
