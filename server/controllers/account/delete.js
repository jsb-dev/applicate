import bcrypt from 'bcrypt';
import User from '../../database/models/user.js';
import Document from '../../database/models/document.js';

const deleteController = async (req, res) => {
  const { userId, password } = req.body;

  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Invalid UserId',
        message:
          'User ID not found, please log out and back in, and try the Delete Account button again. Contact support if the issue persists',
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        error: 'Password mismatch',
        message:
          'The password you entered is incorrect, please recheck and try again',
      });
    }

    for (let i = 0; i < user.documentArray.length; i++) {
      const documentId = user.documentArray[i]._id;
      const doc = await Document.findOne({ _id: documentId });
      const collaborators = doc.collaborators;
      for (let j = 0; j < collaborators.length; j++) {
        const collaborator = await User.findOne({ _id: collaborators[j] });
        if (collaborator) {
          collaborator.sharedDocs = collaborator.sharedDocs.filter(
            (sharedDoc) => sharedDoc.toString() !== documentId.toString()
          );
          await collaborator.save();
        }
      }
      await Document.findOneAndDelete({ _id: documentId });
    }

    for (let i = 0; i < user.sharedDocs.length; i++) {
      const documentId = user.sharedDocs[i];
      const document = await Document.findOne({ _id: documentId });
      if (document) {
        document.collaborators = document.collaborators.filter(
          (collaborator) => collaborator.toString() !== user._id.toString()
        );
        await document.save();
      }
    }

    await User.findOneAndDelete({ _id: userId });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message:
        'Unable to process your request at this time. Please try again later, or contact support if this issue persists.',
    });
  }
};

export default deleteController;
