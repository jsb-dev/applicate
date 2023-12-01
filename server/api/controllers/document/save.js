import Document from '../../../database/models/document.js';

const saveController = async (req, res) => {
  const { docId, json } = req.body;
  try {
    const doc = await Document.findOne({ _id: docId });
    if (!doc) {
      return res.status(404).send({
        success: false,
        message: 'Document not found.',
      });
    }
    doc.content = json;
    doc.dateModified = doc.currentDate();
    try {
      const updatedDoc = await doc.save();
      res.send({
        success: true,
        message: 'Saved document ' + updatedDoc.fileName + ' successfully.',
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        error: error.message,
        message:
          'Something went wrong, please try again. Contact support if this issue persists.',
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      error: error.message,
      message:
        'Something went wrong, please try again. Contact support if this issue persists.',
    });
  }
};

export default saveController;
