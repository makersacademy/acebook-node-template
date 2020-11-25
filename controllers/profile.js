var Profile = require('../models/user');

var ProfileController = {
  Index: function(req, res) {
    Profile.find(function(err, user) {
      if (err) { throw err; }

      res.render('profile/profile', { title: 'Acebook' });
    });
  }
}
    module.exports = ProfileController;
