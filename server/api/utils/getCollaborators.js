import User from '../../database/models/user.js';

const getCollaborators = async (req, res) => {
  try {
    const collaboratorsArray = req.body.collaborators;
    let collaborators = [];
    for (const id of collaboratorsArray) {
      const user = await User.findOne({ _id: id });
      if (!user) {
        throw new Error(`User with id ${id} not found`);
      }
      collaborators.push(user.email);
    }
    res.send({ success: true, collaborators: collaborators });
  } catch (error) {
    res.send({
      success: false,
      error: error,
      message: 'Failed to load document collaborators, please try again',
    });
  }
};

export default getCollaborators;
