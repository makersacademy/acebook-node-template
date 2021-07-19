var User = require('../models/user');

var HomeController = {
  Index: function(req, res) {
    res.render('home/index', { title: 'Acebook' });
  },

  Create: function(req, res) {
    var user = new User(req.body);
    user.save(function(err, username) {
      if (err) { throw err; }

      res.render('home/success', {users: username} );
    });
  },


};

module.exports = HomeController;
