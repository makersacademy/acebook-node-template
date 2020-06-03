var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
