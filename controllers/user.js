var User = require('../models/user')
console.log(4)
var UserController = {
  New: function(req, res){
    res.render('user/new', {});
    // the 'user/new' is referring to the new.hbs file in the views > user folder
  },

  Create: function(req, res){
    console.log(req.body);
    var user = new User(req.body);
    user.save(function(err){
      if (err) { throw err; }

      res.status(201).redirect('/posts')
    });
  }
};

module.exports = UserController;
