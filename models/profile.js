var mongoose = require('mongoose');

var ProfileSchema = new mongoose.Schema({
  message: String,
});

var Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;
