// This is a controller for the signup router in order to handle the signup process
import User from '../database/Models/user.js';

// a function to handle the signup process using email and password for the User model
console.log('Controller loads');
const signupController = async (req, res) => {
  console.log('Signup Controller function starts');
  const { email, password } = req.body;
  console.log('Email and password are received');
  try {
    const user = new User({ email, password });
    console.log('User is created');
    await user.save();
    console.log('User is saved');
    const token = await user.generateAuthToken();
    console.log('Token is generated');
    res.status(201).send({ user, token });
    console.log('User and token are sent');
  } catch (error) {
    console.log('Error is caught');
    res.status(400).send(error);
    console.log('Error is sent');
  }
  console.log('Signup Controller function ends');
};

export default signupController;
