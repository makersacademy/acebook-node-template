var User = require('../models/signup');
// var Response = require('../common/response');

var HomeController = {
  Index: function(req, res) {
    User.find(function(err) {
      if (err) { throw err; }
      sess=req.session;  
      if(sess.email) { 
        res.redirect('/posts');
       } else {
    res.render('home/index', { title: 'Acebook' });
       }
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
        sess=req.session;     
        sess.email=req.body.email;
        res.cookie('email', user.email);
        email = req.cookies['email']     
        req.session.cookie.maxAge = 1
        res.redirect('/posts');
      } else {
        res.send("Incorrect Password");}
    });
  });
}
}

module.exports = HomeController;