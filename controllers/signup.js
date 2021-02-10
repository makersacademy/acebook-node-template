const User = require("../models/users");
const bcrypt = require('bcrypt'); // a library to encrypt password

var SignUpController = {
  Index: function(req, res) {
    res.render('home/signup', { 
        title: 'Acebook',
    });
  },
  Create: async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const salt = await bcrypt.genSalt(); // randomly generated string of characters to add in front of user's password
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username: username,
      password: hashedPassword
    });
    await user.save((err) => {
      if (err) {
        res.redirect('/signup');
        console.log(err);
      } else {
        console.log('user is created')
        req.session.user = user;
        res.status(201).redirect('/content');
      };
    });
  }
};

module.exports = SignUpController;
