var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
});

//Authenticates input against the database
UserSchema.statics.authenticate = function(username, password, callback){
  User.findOne({ username: username })
  .exec(function (err, user) {
    if(err){
      return callback(err)
    } else if (!user) {
      err = new Error('User not found.');
      err.status = 401;
      return callback(err);
    }
  bcrypt.compare(password, user.password, function (err, result){
    if (result === true) {
      return callback(null, user);
    } else {
      return callback();
    }
  })
});
}

var User = mongoose.model('User', UserSchema);
module.exports = User;
