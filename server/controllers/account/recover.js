import jwt from 'jsonwebtoken';
import validator from 'validator';
import dotenv from 'dotenv';
import User from '../../database/models/user.js';
import sendEmail from '../../utils/sendEmail.js';

const recoverController = async (req, res) => {
  dotenv.config();

  const { email } = req.body;

  const user = await User.findOne({ email });

  const isValidEmail = validator.isEmail(email);
  if (!isValidEmail) {
    return res.json({
      success: false,
      error: 'Invalid email',
      message: 'Please enter a valid email address',
    });
  }

  if (!user) {
    return res.json({
      success: false,
      error: 'User not found',
      message:
        'We couldn’t find this email in our system, please check that you entered it correctly, or sign up now to create an account',
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '15m',
  });

  user.tokens.push(token);
  await user.save();

  const recoveryLink = `http://localhost:3000/recovery?auth=${token}`;

  sendEmail(
    process.env.SMTP_USER,
    email,
    'Password Recovery',
    '',
    `<p>Let's get this sorted! Please click the link provided to recover your password:</p><a>${recoveryLink}</a><p>This link is active for 15 minutes, after which you'll have to request another password recovery if you still don't have access. If you did not request a password recovery, please reply to this email and we will get in touch to secure your account. If you have any queries, reply to this email and we'll be with you soon!</p><p>Thanks,</p><p>Applicate Support Team</p>`
  );

  res.json({
    success: true,
    message:
      'Recovery email sent successfully! Check your email inbox/junk for our link to reset your password.',
  });
};

export default recoverController;
