var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a new instance of schema to define the structure of the 'post' document/table that we want to store in the database collection
var UsersSchema = new Schema({
  _id: Schema.Types.ObjectId,
  username: {
    type: String,
    required: 'Add a username'
  },
  password: {
    type: String,
    required: 'Add a password'
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Content'
  }]
});

var User = mongoose.model('User', UsersSchema); // compile the UserSchema to create a User model

module.exports = User;