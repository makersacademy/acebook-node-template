var mongoose = require('mongoose').model('User').schema;

var Profile = mongoose.model('User', UserSchema);

module.exports = Profile;
