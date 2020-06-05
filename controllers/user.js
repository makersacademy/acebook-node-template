var User = require('../models/user')

var UserController = {
  New: function(req, res){
    res.render('user/new', {});
    // the 'user/new' is referring to the new.hbs file in the views > user folder
  },

  Create: function(req, res){
    User.findOne({email: req.body.email}, function(err, email) {
      if (err) { throw err; }
      if (email) {
        res.render('user/new', { msg:'user exist' });
      }
      else {
        var user = new User({firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: req.body.password});
        user.save(function(err){
          if (err) { throw err; }
          res.render('posts/index', { msg:"Welcome " + user.firstName + " ! " })
        });
      }    
    });  
  }
};

module.exports = UserController;
