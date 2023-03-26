import sendEmail from '../../utils/sendEmail.js';
import validator from 'validator';
import dotenv from 'dotenv';

const enquiryController = (req, res) => {
  dotenv.config();

  const SMTP_USER = process.env.SMTP_USER;

  const { userEmail, subject, description } = req.body;

  try {
    if (!validator.isEmail(userEmail)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid Email',
        message: 'Please enter a valid email address',
      });
    }

    sendEmail(
      SMTP_USER,
      SMTP_USER,
      subject,
      'User Query: \n',
      '<p>' + description + '</p><br /><p>From: ' + userEmail + '</p>'
    );

    res.send({
      success: true,
      message: 'Your message has been sent. We will be in touch soon!',
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
      message:
        'Something went wrong. Please try again later, or contact us directly at support@applicate.dev',
    });
  }
};

export default enquiryController;
