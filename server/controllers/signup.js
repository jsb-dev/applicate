// This is a controller for the signup router in order to handle the signup process

import User from '../database/Models/user.js';

// an async function to handle the signup process
const signupController = async (req, res) => {
  try {
    // destructure the email and password from the request body
    const { email, password } = req.body;
    // find a user with the email address
    const user = await User.findOne({
      email,
    });
    // if a user is found, return an error
    if (user) {
      return res.status(400).json({
        error: 'Email is already in use',
      });
    }
    // create a new user with the email and password
    const newUser = await User.create({
      email,
      password,
    });
    // return the new user
    res.status(201).json({
      user: newUser,
    });
  } catch (error) {
    // if an error occurs, return an error
    res.status(500).json({
      error: 'Error registering new user please try again',
    });
  }
};

export default signupController;
