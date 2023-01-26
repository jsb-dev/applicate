import mongoose from 'mongoose';
import User from '../../database/models/user.js';

const Document = mongoose.model('Document');

const deleteController = async (req, res) => {
  const { docId, author } = req.body;

  console.log('Request Body', req.body);
  console.log('Delete document', docId, author);

  const document = await Document.findOne({ _id: docId });
  if (!document) {
    return res.status(404).send({
      success: false,
      error: 'Document not found',
      message: 'Something went wrong, please refresh and try again',
    });
  }

  if (document.author !== author) {
    return res.status(401).send({
      success: false,
      error: 'Permission denied',
      message: 'You do not have permission to delete this document',
    });
  }

  await document.remove();

  const user = await User.findOne({ email: author });
  if (!user) {
    return res.status(404).send({
      success: false,
      error: 'User not found',
      message: 'Something went wrong, please refresh and try again',
    });
  }

  const docIdIndex = user.documentArray.findIndex(
    (id) => id.toString() === docId.toString()
  );

  if (docIdIndex === -1) {
    return res.status(401).send({
      success: false,
      error: 'Permission denied',
      message: 'You do not have permission to delete this document',
    });
  }

  user.documentArray.splice(docIdIndex, 1);
  await user.save();

  res.send({
    success: true,
    message: 'Document deleted successfully',
  });
};

export default deleteController;
