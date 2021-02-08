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

      if (!user) {
        return res.status(404).redirect('/login').send({ message: 'The user does not exist. '});
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(404).send('The password is invalid');
      } else {
        res.send('The username and password combination is correct!');
      }
    } catch {
      res.status(500).send('Internal Server Error');
    }
  }
};

  module.exports = LoginController;
  