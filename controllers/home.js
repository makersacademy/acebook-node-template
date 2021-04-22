var User = require('../models/user');
var bcrypt = require('bcrypt');
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
          return res.status(401).redirect('/error')
         }

        return res.status(201).redirect('/');
        
      });
    },
    
    Login: function(req, res){
      var username = req.body.loginUsername;
      var password = req.body.loginPassword;

      //{ <field>: { $eq: <value> } }
      User.findOne({ username: username }, (err, result) => {
        if(err) {
          throw err;
        }

        var passwordMatch = bcrypt.compareSync(password, result.password)

        if (passwordMatch) {
          console.log("Password correct");
          res.status(201).redirect('/posts')
        } else {
          console.log("Password wrong");
        } 
      })

    
    },

    Error: function(req, res) {
      res.render('error', {message: 'Username is in use'});
    }
};

module.exports = HomeController;
