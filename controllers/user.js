var User = require('../models/user');

var UserController = {
Create: function(req, res) {
  var user = new User({username: 'username', password: 'password'});
  user.save(function(err) {
    if (err) { throw err; }
    res.send('Hey this is a message');
  });
}
};

module.exports = UserController;
