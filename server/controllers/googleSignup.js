import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import User from '../database/models/user.js';
import dotenv from 'dotenv';

dotenv.config();

const googleSignupController = async (req, res) => {
  // Get the authorization code from the request query
  const { code } = req.query;

  // Create a new OAuth2Client
  const oAuth2Client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);

  // Exchange the authorization code for an access token
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);

  // Use the access token to retrieve the user's email address
  const oauth2 = google.oauth2({
    auth: oAuth2Client,
    version: 'v2',
  });
  const userInfo = await oauth2.userinfo.get();
  const email = userInfo.data.email;

  // Check if the email address is already in use
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).send({
      error: 'Email already in use, log in using original signup method',
    });
  }

  // Validate the email address
  if (!validator.isEmail(email)) {
    return res.status(400).send({ error: 'Invalid email address' });
  }

  // Generate a random 7 character password
  const password = Math.random().toString(36).substring(2, 9);

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    // Create a new user with the hashed password
    const user = new User({ email, password: hashedPassword });

    // Generate an auth token for the user and push it to the user's tokens array
    const token = await user.generateAuthToken();
    user.tokens.push(token);
    user.googleAccount = true;

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
    console.log('Google signup POST request successful');

    // Log the user to the console
    console.log('New user email: ', user.email);
  } catch (error) {
    // If there was an error saving the user, send a 400 error
    console.log(error);
    res.status(400).send(error);
  }
};

export default googleSignupController;
