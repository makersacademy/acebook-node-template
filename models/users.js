var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a new instance of schema to define the structure of the 'post' document/table that we want to store in the database collection
var UsersSchema = new Schema({
  username: {
    type: String,
    required: 'Add a username'
  },
  password: {
    type: String,
    required: 'Add a password'
  }
});

var User = mongoose.model('Users', UsersSchema); // compile the UserSchema to create a User model

module.exports = User;