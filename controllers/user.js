var User = require('../models/user')
console.log(4)
var UserController = {
  New: function(req, res){
    res.render('user/new', {});
    // the 'user/new' is referring to the new.hbs file in the views > user folder
  },

  Create: function(req, res){
    //console.log(req.body);
    var user = new User(req.body);
    user.save(function(err){
      //console.log("we are here")
      //console.log(err)
      if (err) { throw new Error('error')}

      res.status(201).redirect('/posts')
    });
  }
};

module.exports = UserController;
