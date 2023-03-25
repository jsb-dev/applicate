import mongoose from 'mongoose';

const Document = mongoose.model('Document');

const renameController = async (req, res) => {
  const { docId, author, value } = req.body;

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

  document.fileName = value;

  await document.save();

  res.send({
    success: true,
    message: 'Document renamed successfully',
  });
};

export default renameController;
