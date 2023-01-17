import jwt from 'jsonwebtoken';
import formatDate from '../../utils/formatDate.js';
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
      author: user.email,
      fileName: value,
    });

    await document.generateUrl();
    document.dateCreated = await document.currentDate();
    document.dateModified = await document.currentDate();
    await document.save();

    user.documentArray.push(document._id);
    await user.save();

    console.log('Document: ', document);
    console.log(
      'res: ',
      document._id,
      value,
      document.author,
      formatDate(document.currentDate())
    );

    res.send({
      success: true,
      documentId: document._id,
      fileName: value,
      author: document.author,
      dateCreated: formatDate(document.currentDate()),
      dateModified: formatDate(document.currentDate()),
    });
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
