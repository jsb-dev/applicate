import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import User from '../../../database/models/user.js';
import Document from '../../../database/models/document.js';

const emailController = async (req, res) => {
  const { newEmail, password } = req.body;

  const token = req.headers.authorization.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id });
    if (!user) {
      return res.status(400).send({
        success: false,
        error: 'User not found',
        message: 'Please log in again to continue',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        error: 'Password mismatch',
        message:
          'The current password you entered is incorrect, please check again',
      });
    }

    if (!validator.isEmail(newEmail)) {
      return res.status(400).send({
        success: false,
        error: 'Invalid email',
        message: 'Please enter a valid email address',
      });
    }

    const emailMatch = await User.findOne({ email: newEmail });

    if (emailMatch) {
      return res.status(400).send({
        success: false,
        error: 'Email taken',
        message:
          'This email is already associated with another account. Please enter a different email address',
      });
    }

    user.email = newEmail;
    await user.save();

    for (let i = 0; i < user.documentArray.length; i++) {
      const document = await Document.findOne({ _id: user.documentArray[i] });
      document.author = newEmail;
      await document.save();
    }

    return res
      .status(200)
      .send({ success: true, message: 'Email changed successfully' });
  } catch (error) {
    return res.status(400).send({
      success: false,
      error: 'Invalid token',
      message: 'Please log in again to continue',
    });
  }
};

export default emailController;
