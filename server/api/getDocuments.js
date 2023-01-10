import Document from '../database/models/document.js';
import User from '../database/models/user.js';

const getDocuments = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const user = await User.findOne({ token });
  if (user) {
    const documents = user.documentArray;
    const documentQueries = documents.map((id) => {
      return Document.findById(id);
    });
    Promise.all(documentQueries)
      .then((results) => {
        const docs = results.map((doc) => ({
          fileName: doc.fileName,
          id: doc._id,
        }));
        res.send({ success: true, documents: docs });
      })
      .catch((error) => {
        console.error(error);
        res.send({ success: false });
      });
  } else {
    res.send({
      success: false,
      error: 'User not found',
      message: 'Please log in or sign up',
    });
  }
};

export default getDocuments;
