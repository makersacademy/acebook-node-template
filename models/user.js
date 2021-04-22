//const { NotExtended } = require('http-errors');
var mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
  username: {type: String, unique : true},
  password: String,
});


var User = mongoose.model('User', UserSchema)



module.exports = User;