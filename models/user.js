var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, match: [/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/, 'password is invalid'] }
});
UserSchema.plugin(uniqueValidator, {message: 'this username is already taken, choose another one'});

var User = mongoose.model('User', UserSchema);


module.exports = User;
