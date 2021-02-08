const User = require("../models/users");
const bcrypt = require('bcrypt');

var LoginController = {
  Index: function(req, res) {
    res.render('home/login', { title: 'Acebook' });
    },
  Login: async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
      const user = await User.findOne({ username: username }).exec();

      // If user object does not exist, return 404 to client
      if (!user) {
        return res.status(404).redirect('/login').send({ message: 'The user does not exist. '});
      }

      // Validate the password
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(404).redirect('/login');
      } else {
        res.status(201).redirect('/content');
        console.log('Username and password are both correct!');
      }
    } catch {
      res.status(500).send('Internal Server Error');
    }
  }
};

  module.exports = LoginController;
  