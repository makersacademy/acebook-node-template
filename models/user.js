var mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
  username:{
    type: string,
    required: true
  },
  password:{
    type: string,
    required: true
  },
});
var User = mongoose.model('User', UserSchema);
module.exports = User;
