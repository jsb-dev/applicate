import User from '../../../database/models/user.js';
import Document from '../../../database/models/document.js';

const unshareController = async (req, res) => {
  try {
    const { docId, email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'User not found',
        message: 'Could not find user, please try again',
      });
    }

    const userDocIndex = user.sharedDocs.findIndex(
      (d) => d.toString() === docId
    );
    if (userDocIndex === -1) {
      return res.status(400).json({
        success: false,
        error: 'Collaborator id not found',
        message: `User ${email} does not have access to this document`,
      });
    }

    user.sharedDocs.splice(userDocIndex, 1);
    await user.save();

    const document = await Document.findOne({ _id: docId });
    if (!document) {
      return res.status(400).json({
        success: false,
        error: 'Document not found',
        message: 'Could not find associated document., please try again later',
      });
    }

    const collaboratorIndex = document.collaborators.findIndex(
      (c) => c.toString() === user._id.toString()
    );
    document.collaborators.splice(collaboratorIndex, 1);
    await document.save();

    return res.status(200).json({
      success: true,
      message: `User ${email} removed from document collaborators`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
      message: 'Failed to remove collaborator, please try again later',
    });
  }
};

export default unshareController;
