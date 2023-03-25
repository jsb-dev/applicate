import Document from '../../../database/models/document.js';

const saveController = async (req, res) => {
  const { docId, json } = req.body;
  Document.findById(docId, (error, doc) => {
    if (error) {
      return res.status(500).send({
        success: false,
        error: error.message,
        message:
          'Something went wrong, please try again. Contact support if this issue persists.',
      });
    }
    if (!doc) {
      return res.status(404).send({
        sucess: false,
        error: error.message,
        message: 'Document not found.',
      });
    }
    doc.content = json;
    doc.dateModified = doc.currentDate();
    doc.save((error, updatedDoc) => {
      if (error) {
        return res.status(500).send({
          success: false,
          error: error.message,
          message:
            'Something went wrong, please try again. Contact support if this issue persists.',
        });
      }
      res.send({
        success: true,
        message: 'Saved document ' + updatedDoc.fileName + 'successfully.',
      });
    });
  });
};

export default saveController;
