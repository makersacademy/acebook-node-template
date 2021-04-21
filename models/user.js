//const { NotExtended } = require('http-errors');
var mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

var User = mongoose.model('User', UserSchema)
console.log(User.password)



module.exports = User;