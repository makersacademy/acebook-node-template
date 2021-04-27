var User = require('../models/user');
var bcrypt = require('bcrypt');
var alert = require('alert');
var jwt = require('jsonwebtoken');
var saltRounds = 10;

var HomeController = {
  Index: function(req, res) {
    res.render('home/index', { title: 'Acebook' });
  },

  Registration: function(req, res) {
      var username = req.body.username;
      var password = req.body.password;
      let hash = bcrypt.hashSync(password, saltRounds)
      var user = new User({ username: username, password: hash })
      user.save(function(err) {
        if (err) { 
          alert('Username already in use.')
          return res.status(401).redirect('/')
         }
        var token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
        return res.status(201).redirect('/posts');
        
      });
    },
    
    Login: function(req, res){
      var username = req.body.loginUsername;
      var password = req.body.loginPassword;
  
      //{ <field>: { $eq: <value> } }
      var user = User.findOne({ username: username }, (err, result) => {
        
        if(err) {
          throw err;
        }
        var passwordMatch = bcrypt.compareSync(password, result.password)

        if (passwordMatch) {
          console.log("Password correct");
          var token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, { expiresIn: "60 days" });
          res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
          res.status(201).redirect('/posts')
        } else {
          console.log("Password wrong");
          alert('Oops, that password is incorrect!')
          return res.status(401).redirect('/')
        } 
      })
    },

    Logout: function(req , res) {

    res.clearCookie('nToken');
    res.redirect('/');
    },

    Error: function(req, res) {
      res.render('error', {message: 'Username is in use'});
    }
};

module.exports = HomeController;
