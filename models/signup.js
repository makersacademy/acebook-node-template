var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  firstname: String,
  secondname: String,
  email: String,
  password: String
});
var User = mongoose.model('myuser', userSchema);
module.exports = User;


// username: {type:String, unique: true}
