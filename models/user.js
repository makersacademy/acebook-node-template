const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'], 
  },
  password: String,
});

UserSchema.path('email').validate(async(email) => {
  const email_count = await mongoose.models.User.countDocuments({email})
  if (email_count === 0) {
    return true
  }
  else
    return false
}, 'Email already exists')

const User = mongoose.model("User", UserSchema);

module.exports = User;