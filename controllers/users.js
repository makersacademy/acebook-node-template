var User = require('../models/user');

var UsersController = {
  Signup: function(req, res){
    res.render('users/index', {});
  },
  CreateUser: function(req, res){
    var user = new User(req.body);
    console.log(req.body);
    user.save(function(err){
      if (err) { throw err }
      
      res.status(201).redirect('/users/welcome');
    });
  },
  Welcome: function(req, res){
    res.render('users/welcome', {} );
  },
}

module.exports = UsersController;