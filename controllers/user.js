var User = require('../models/user');


var UserController = {
  Index:function(req, res){

    req.session.viewCount += 1;

    res.render('user/signup', { title: 'Signup to Acebook', viewCount: req.session.viewCount  }); // is this useruser grabbing entire instance
  },

  Create: function(req, res) {
    var user = new User({firstName: req.body.firstName});

    user.save(function(err) {
      if (err) { throw err; }

      res.status(201).redirect('/');
    });

    req.session.user = user._id
  }
};

module.exports = UserController;


// create a session for user = User._id 