const User = require('../models/user');

const SessionsController = {
  New: (req, res) => {
    res.render('sessions/new', {});
  },

  Create: async (req, res) => {
    console.log('trying to log in');
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.render('sessions/new', { error: 'Invalid email or password' });
      }

      // Check if the submitted password matches the stored password directly
      if (password !== user.password) {
        return res.render('sessions/new', { error: 'Invalid email or password' });
      }

      req.session.user = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
      }

      return res.redirect('/posts');
      
    } catch (err) {
      console.error(`Error while logging in: ${err}`);
      return res.status(500).send('Internal server error');
    }
  },

  Destroy: (req, res) => {
    console.log('logging out');
    if (req.session.user && req.cookies.user_sid) {
      res.clearCookie('user_sid');
    }
    req.session.destroy();
    res.redirect('/sessions/new');
  },
};

module.exports = SessionsController;