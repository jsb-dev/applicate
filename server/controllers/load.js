import User from '../database/models/user.js';
import Document from '../database/models/document.js';

const loadController = (req, res) => {
  const documentId = req.params.documentId;

  console.log(documentId);
  // Find the user associated with the provided token
  User.findOne({ token: req.body.token }, (err, user) => {
    if (err || !user) {
      // Return an error if the user can't be found
      return res
        .status(400)
        .send({ success: false, message: 'User not found' });
    }

    // Find the document with the specified documentId in the user's documentArray
    const document = Document.findOne((doc) => doc.id === documentId);
    if (!document) {
      // Return an error if the document can't be found
      return res
        .status(400)
        .send({ success: false, message: 'Document not found' });
    }

    // Return the content of the found document
    return res.status(200).send({ success: true, content: document.content });
  });
};

export default loadController;
