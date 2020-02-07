var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: {type:String, unique: true}
});

var User = mongoose.model('myuser', userSchema);

module.exports = User;
