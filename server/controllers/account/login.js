import User from '../../database/models/user.js';
import bcrypt from 'bcryptjs';

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).send({
      success: false,
      error: 'Invalid email',
      message: 'User email not found. Please sign up or recheck your email.',
    });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).send({
      success: false,
      error: 'Invalid password',
      message: 'Incorrect password',
    });
  }

  try {
    const token = user.generateAuthToken();
    user.tokens.push(token);
    await user.save();

    res
      .status(201)
      .send({ success: true, message: 'Successfully logged in', user, token });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message,
      message:
        'Something went wrong, please try again. Contact support if this issue persists',
    });
  }
};

export default loginController;
