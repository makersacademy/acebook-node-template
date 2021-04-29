//const { NotExtended } = require('http-errors');
var mongoose = require('mongoose');

var Schema = mongoose.Schema
var UserSchema = new mongoose.Schema({
  username: {type: String, unique : true},
  password: String,
  posts : [ { type: Schema.Types.ObjectId, ref: "Post" } ]
});


var User = mongoose.model('User', UserSchema)



module.exports = User;