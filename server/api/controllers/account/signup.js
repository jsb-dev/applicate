import bcrypt from 'bcryptjs';
import validator from 'validator';
import User from '../../database/models/user.js';

const signupController = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).send({
      success: false,
      error: 'Email already in use',
      message:
        'Email already in use, please sign in with the existing account or use a different email address.',
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).send({
      success: false,
      error: 'Invalid email address',
      message: 'Please use a valid email address',
    });
  }

  if (password.length < 7) {
    return res.status(400).send({
      success: false,
      error: 'Password too short',
      message: 'Password must be at least 7 characters long',
    });
  }

  if (password.match(/[\(\){}\[\]|`¬¦! "£\$%\^&\*"<>:;#~_\-+=,@]/g)) {
    return res.status(400).send({
      success: false,
      error: 'Password contains invalid characters',
      message:
        'Password must not contain any of these characters: (){}[]|`¬¦! "£$%^&*"<>:;#~_-+=,@',
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = new User({ email, password: hashedPassword });
    const token = await user.generateAuthToken();
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

export default signupController;
