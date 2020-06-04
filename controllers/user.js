var User = require('../models/user');

var UserController = {
  Index:function(req, res){
    res.render('user/signup', { title: 'Signup to Acebook' }); // is this useruser grabbing entire instance
  },

  Create: function(req, res) {
    var user = new User({firstName: req.body.firstName});
    user.save(function(err) {
      if (err) { throw err; }

      res.status(201).redirect('/');
    });
  }
};

module.exports = UserController;


