var User = require('../models/user');
const bcrypt = require('bcrypt');

var UsersController = {
  Signup: function(req, res){
    res.render('users/index', {});
  },
  CreateUser: async function(req, res){
    const { email, password } = req.body;
    const hash = await bcrypt.hash(password, 12); 

    var user = new User( {
      email,
      password: hash}
    );

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
  },
  Authenticate: async function(req, res){
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const validPassword = await bcrypt.compare(password, user.password);
    if(validPassword){
      res.send('Welcome')
    } 
    else{
      res.send('Try again')
    }
  }
}

module.exports = UsersController;