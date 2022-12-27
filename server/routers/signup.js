import User from '../database/Models/user.js';

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
    });
    if (user) {
      return res.status(400).json({
        error: 'Email is already in use',
      });
    }
    const newUser = await User.create({
      email,
      password,
    });
    res.status(201).json({
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error registering new user please try again',
    });
  }
});

export default signupRouter;
