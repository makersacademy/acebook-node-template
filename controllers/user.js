var User = require('../models/user');

var UserController = {
  
  Index:function(req, res){
    res.render('user/signup', { title: 'Signup to Acebook', loginTitle: 'Login to Acebook'}); // is this useruser grabbing entire instance
  },

  Create: function(req, res) {
    var user = new User({firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: req.body.password});

    user.save(function(err) {
      if (err) { throw err; }

      // route was formerly '/validate'
      // res.status(201).redirect('/validateSignUp');
      res.render('user/validateSignUp', { signupMessage: "Sign up sucessful.", firstName: req.body.firstName} )
    });

    req.session.user = user._id
  },

  Validate: function(req, res) {

    console.log(req.body.email);
    console.log(req.body.password);

    User.findOne( {email: req.body.email}, function(err, result) {

      if(result.password == req.body.password) {
        //redirect user logged in
        res.render('user/validateLogin', { loginMessage: "Login sucessful." } )
      } else {
        //errror
        res.render('user/validateLogin', { loginMessage: "Login unsuccessful: incorrect email or password."})
      }

    })
  
  },
}

module.exports = UserController;