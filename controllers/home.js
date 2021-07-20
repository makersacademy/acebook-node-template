var User = require('../models/user');

var HomeController = {
  Index: function(req, res) {
    res.render('home/index', { title: 'Acebook' });
  },

  Create: function(req, res) {
    var user = new User(req.body);
    
    user.save(function(err) {
      if (err) { throw err; }

      res.status(201).redirect('/sessions');
    });

  },

  SigninPage: function(req, res) {
    res.render('home/signin');
  },

  Signin: function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    
    User.find(function(err, users) {
      if (err) { throw err; }
      
      for(var i=0; i<users.length; i++) {

        if(users[i].username === username) {
          if(users[i].password === password) {
            users[i].active = true;
            users[i].save();
            
            return res.status(201).redirect('/posts');
          } 
        } 
      }

      res.status(201).redirect('/sessions');

    });
  },

};

module.exports = HomeController;
