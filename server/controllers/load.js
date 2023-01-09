import User from '../database/models/user.js';
import Document from '../database/models/document.js';

const loadController = async (req, res) => {
  try {
    // Find the user associated with the provided token
    const user = await User.findOne({ token: req.body.token });
    if (!user) {
      // Return an error if the user can't be found
      return res
        .status(400)
        .send({ success: false, message: 'User not found' });
    }
    // Find the document with the specified documentId in the user's documentArray
    // The documentId is passed in the request body
    const documentId = req.body.docId;
    const document = await Document.findOne({ documentId });
    if (!document) {
      // Return an error if the document can't be found
      return res
        .status(400)
        .send({ success: false, message: 'Document not found' });
    }

    // Return the content of the found document
    return res.status(200).send({ success: true, content: document.content });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, message: error.message });
  }
};

export default loadController;
