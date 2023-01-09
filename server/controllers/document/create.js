import jwt from 'jsonwebtoken';
import Document from '../../database/models/document.js';
import User from '../../database/models/user.js';

const createController = async (req, res) => {
  const { value, token } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id }).exec();

    if (!user) {
      return res.status(400).send({
        success: false,
        error: 'User not found',
        message:
          'User not found, please sign in with an existing account or create a new account',
      });
    }

    const document = new Document({
      userId: user._id,
      fileName: value,
    });

    await document.generateUrl();
    await document.save();

    user.documentArray.push(document._id);
    await user.save();

    res.send({ success: true, documentId: document._id, fileName: value });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message,
      message:
        'Something went wrong, please try again. Contact support if this issue persists',
    });
  }
};

export default createController;
