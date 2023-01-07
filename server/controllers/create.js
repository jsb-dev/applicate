import jwt from 'jsonwebtoken';
import Document from '../database/models/document.js';
import User from '../database/models/user.js';

const createController = async (req, res) => {
  // Get the value and token from the request body
  const { value, token } = req.body;

  try {
    // Verify the user's token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user in the database based on the decoded token
    const user = await User.findOne({ _id: decoded._id }).exec();
    if (!user) {
      throw new Error('User not found');
    }

    // Create a new Document with the value and the user's _id
    const document = new Document({
      userId: user._id,
      fileName: value,
    });

    // Generate a uniqueUrl for the Document and save it to the database
    await document.generateUrl();
    await document.save();

    // Push the document's _id to the user's documentArray field
    user.documentArray.push(document._id);
    await user.save();

    // Send a response indicating that the document was created successfully
    res.send({ success: true, documentId: document._id, fileName: value });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error: error.message });
  }
};

export default createController;
