import User from '../../database/models/user.js';
import Document from '../../database/models/document.js';

const loadController = async (req, res) => {
  try {
    const user = await User.findOne({ token: req.body.token });

    if (!user) {
      return res.status(400).send({
        success: false,
        error: error.message,
        message: 'User not found',
      });
    }

    const documentId = req.body.docId;

    const document = await Document.findOne({ _id: documentId });

    if (!document) {
      return res.status(400).send({
        success: false,
        error: error.message,
        message: 'Document not found',
      });
    }

    return res.status(200).send({
      success: true,
      documentId: document._id,
      content: document.content,
      fileName: document.fileName,
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

export default loadController;
