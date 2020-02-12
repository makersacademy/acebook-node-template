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
     if (err) throw err;
     // test a matching password
     
     user.comparePassword(password, function(err, isMatch) {

      if (err) throw err;
      if(isMatch) {
        // res.cookie('email', user.email)   SETTING COOKIE
        // email = req.cookies['email']      RETRIEVING COOKIE
        res.redirect('/posts');
      } else {
        res.redirect('/');}
     });

     
    //  test a failing password
    //  user.comparePassword('password: req.body.password', function(err, isMatch) {
    //   if (err) throw err;
    //   console.log({password: req.body.password}, isMatch); // -> 123Password: false
    //  });
    });
}
}

module.exports = HomeController;