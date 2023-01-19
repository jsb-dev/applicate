import jwt from 'jsonwebtoken';
import formatDate from '../utils/formatDate.js';
import Document from '../database/models/document.js';
import User from '../database/models/user.js';

const getDocuments = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  console.log('Request received');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id }).exec();

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
            author: doc.author,
            dateCreated: formatDate(doc.dateCreated),
            dateModified: formatDate(doc.dateModified),
          }));
          console.log(docs);
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
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message,
      message:
        'Something went wrong, please try again. Contact support if this issue persists',
    });
  }
};

export default getDocuments;
