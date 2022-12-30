import User from '../database/Models/user.js';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const signupController = async (req, res) => {
  // Get the email and password from the request body
  const { email, password } = req.body;
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
    // Save the user to the database
    await user.save();

    // Generate an auth token for the user
    const token = await user.generateAuthToken();

    // Send the user and token as the response
    res.status(201).send({ user, token });

    // Confirm that the POST request was successful
    console.log('POST request successful');

    // Log the user document
    console.log(user);
  } catch (error) {
    // If there was an error saving the user, send a 400 error
    console.log(error);
    res.status(400).send(error);
  }
};

export default signupController;
