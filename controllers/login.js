const User = require("../models/users");

var LoginController = {
  Index: function(req, res) {
    res.render('home/login', { title: 'Acebook' });
    },
  Login: function(req, res) {      
    username = req.body.username;
    password = req.body.password;

    User.findOne({username: username, password: password}, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
      }

      // if user object doesn't exist in the database, send 404 status back to client
      if (!user) {
        return res.status(404).send('User not found');
      }

      // if user object exist in the database, redirect user to the dashboard
      console.log(user)
      return res.status(201).redirect('/content');
    })
  }
};

  module.exports = LoginController;
  