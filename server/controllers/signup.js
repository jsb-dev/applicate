import User from '../database/Models/user.js';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const signupController = async (req, res) => {
  console.log('Controller received request with body:', req.body);
  // Get the email and password from the request body
  const { email, password } = req.body;
  console.log(
    'Email and password destructured, req.body prints as: ',
    req.body
  );
  // Validate the email address
  console.log('Begin - validating email address');
  if (!validator.isEmail(email)) {
    console.log('This process will now throw an error if invalid');
    return res.status(400).send({ error: 'Invalid email address' });
  }

  // Hash the password
  console.log('Begin - hashing password');
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log('Begin - creating new user document');
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
    console.log(
      'Error saving user to database - Error is somewhere between this console log and the last one'
    );
    console.log(error);
    res.status(400).send(error);
  }
};

export default signupController;
