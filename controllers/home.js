var User = require('../models/signup');
// var Response = require('../common/response');

var HomeController = {
  Index: function(req, res) {
    User.find(function(err) {
      if (err) { throw err; }
    res.render('home/index', { title: 'Acebook' });
  });
  },

Login: function(req, res) {

  var password = req.body.password
    User.findOne({email: req.body.email}, function(err, user) {
      if (!user) {
        console.log("No User")
        res.redirect('/');
        return;
       }
     // test a matching password
     user.comparePassword(password, function(err, isMatch) {
      if (err) throw err;
      if(isMatch) {
        res.cookie('email', user.email)
        email = req.cookies['email']  
        res.redirect('/posts');
      } else {
        res.redirect('/');
      }
     });
    });
}
}
module.exports = HomeController;