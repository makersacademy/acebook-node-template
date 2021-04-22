var User = require('../models/user');
const bcrypt = require('bcrypt');

var UsersController = {
  Signup: function(req, res){
    res.render('users/index', {});
  },
  CreateUser: async function(req, res){
    const { email, password } = req.body;
    const hash = await bcrypt.hash(password, 12); 
    console.log(hash);

    var user = new User( {
      email,
      password: hash}
    );

    console.log(req.body);
    await user.save(function(err){
      if (err) { throw err }
      
      res.status(201).redirect('/users/welcome');
    });
  },
  Welcome: function(req, res){
    res.render('users/welcome', {});
  },
  Login: function(req, res){
    res.render('users/login', {});
  }
}

module.exports = UsersController;