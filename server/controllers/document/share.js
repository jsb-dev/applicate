import Document from '../../database/models/document.js';
import User from '../../database/models/user.js';
import validator from 'validator';

const shareController = async (req, res) => {
  try {
    const { docId, user, value } = req.body;

    const document = await Document.findOne({ _id: docId });
    if (!document) {
      return res.status(400).json({
        success: false,
        error: 'invalid docId',
        message:
          "This document could not be found. Try again later, or check that it hasn't been deleted by the author",
      });
    }

    if (user !== document.userId) {
      return res.status(401).json({
        success: false,
        error: 'permission denied',
        message:
          'You do not have permission to add collaborators to this document, only the author who created the document has permission',
      });
    }

    if (!validator.isEmail(value)) {
      return res.status(400).json({
        success: false,
        error: 'invalid email',
        message: 'Please enter a valid email address',
      });
    }

    const collaborator = await User.findOne({ email: value });
    if (!collaborator) {
      return res.status(400).json({
        success: false,
        error: 'user not found',
        message: 'The user with the given email address could not be found',
      });
    }

    document.collaborators.push(collaborator._id);
    await document.save();

    collaborator.sharedDocs.push(docId);
    await collaborator.save();

    return res.json({
      success: true,
      message: 'Successfully added a new document collaborator',
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
};

export default shareController;
