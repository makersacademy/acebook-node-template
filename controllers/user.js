var User = require('../models/user');

var UserController = {
Signup: function(req, res) {
  res.render('user/signup', {});
},

Create: function(req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  user.save(function(err) {
    if (err) {
      throw err;
    } else {
      req.session.userId = user._id;
    res.render('user/index');
    }
  });
},

  Authenticate: function(req, res, next){
    User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('You are not authorised.');
          err.status = 400;
          return next(err);
        } else {
          return res.send('<h1>Name: </h1>' + user.username + '<br><a type="button" href="/logout">Logout</a>')
        }
      }
    })
  },

  Logout: function(req, res, next) {
    if (req.session) {
      //Deletes session object
      req.session.destroy(function(err){
        if (err) {
          return next(err);
        } else {
          return res.redirect('/');
        }
      });
    }
  }
}

module.exports = UserController;
