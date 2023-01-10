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
    console.log('req.body.docId: ', req.body.docId);
    console.log('documentId: ', documentId);
    let document = await Document.findOne({ documentId });
    console.log('Found document with id: ', document._id);
    console.log('document: ', document);

    if (!document) {
      return res.status(400).send({
        success: false,
        error: error.message,
        message: 'Document not found',
      });
    }

    console.log('Returning document content: ', document.content);
    console.log('Returning document fileName: ', document.fileName);

    return res.status(200).send({
      success: true,
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
