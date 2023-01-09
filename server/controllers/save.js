import Document from '../database/models/document.js';

const saveController = async (req, res) => {
  const { docId, json } = req.body;
  Document.findById(docId, (err, doc) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!doc) {
      return res.status(404).send({ message: 'Document not found.' });
    }
    doc.content = json;
    doc.save((err, updatedDoc) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send(updatedDoc);
    });
  });
};

export default saveController;
