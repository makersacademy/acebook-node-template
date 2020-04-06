var User = require('../models/user');
var bodyParser = require('body-parser');

var UserController = {
Signup: function(req, res) {
  res.render('user/signup', {});
},

Create: function(req, res) {
  var user = new User({
    username: req.body.username,

    password: req.body.password,

  });

  console.log("*********")
  console.log(user.username)
  console.log("*********")
  console.log("*********")
  console.log(user.password)
  console.log("*********")
  console.log("*********")
  console.log(req.body)
  console.log("*********")

  user.save(function(err) {
    if (err) { throw err; }
    res.render('user/index');
  });
}
};

module.exports = UserController;
