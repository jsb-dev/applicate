import mongoose from 'mongoose';
import User from '../../../database/models/user.js';

const Document = mongoose.model('Document');

const deleteController = async (req, res) => {
  const { docId, userId } = req.body;

  const document = await Document.findOne({ _id: docId });
  if (!document) {
    return res.status(404).send({
      success: false,
      error: 'Document not found',
      message: 'Something went wrong, please refresh and try again',
    });
  }

  if (document.userId !== userId) {
    return res.status(401).send({
      success: false,
      error: 'Permission denied',
      message:
        'Only the document Author has permission to delete a document. You are a collaborator.',
    });
  }

  await document.remove();

  const user = await User.findOne({ _id: userId });
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

  const collaborators = document.collaborators;
  for (let i = 0; i < collaborators.length; i++) {
    User.findOne({ _id: collaborators[i] })
      .then((user) => {
        const docIdIndex = user.sharedDocs.findIndex(
          (id) => id.toString() === docId.toString()
        );
        user.sharedDocs.splice(docIdIndex, 1);
        user.save();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  res.send({
    success: true,
    message: 'Document deleted successfully',
  });
};

export default deleteController;
