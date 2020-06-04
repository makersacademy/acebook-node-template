var User = require('../models/user');

var HomeController = {

  Index: function(req, res) {

    
    User.find(function(err, users) {
      if (err) { throw err; }
      
      res.render('home/index', { title: 'Acebook', firstName: users[1].firstName });
    });
  },


};

module.exports = HomeController;


// redirect '/' if User.current_user == nil