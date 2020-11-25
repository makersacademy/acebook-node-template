var Profile = require('../models/profile');

var ProfileController = {
  Index: function(req, res) {
    res.render('profile/index', { profilename: 'Deborah' });
  },
  Create: function(req,res) {
    var profile = new Profile(req.body);
    profile.save(function(err){
      if (err) { throw err; }

      res.status(201).redirect('/profile')
    });
  }
};

module.exports = ProfileController;
