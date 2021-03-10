var User = require('../models/user');


var SignupController = {
    Index: function(req, res) {
      res.render('signup/index');
    },
    Create: function(req, res) {
      console.log(req.body.username);
      console.log(req.body.password);
      var user = new User( {username: req.body.username, password: req.body.password});
      user.save(function(err) {
        if (err) { throw err; }
  
        res.status(201).redirect('/login');
      });
    },
    
  };
  
  module.exports = SignupController;