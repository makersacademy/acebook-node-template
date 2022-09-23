const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'], 
  },
  password: String,
  username: String,
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




UserSchema.path("password").validate(function passwordValidator(password) {
  let specialChar =~ /[a-z][A-Z][!@£$%&*]/;

  if (this.isNew && this.password.length === 0) {
    this.invalidate('password', 'Password is required')
  };
  if (this.isNew && !this.password.length < 7) {
    this.invalidate('password', 'Password should be longer than 7 characters or more')
  };
  if (this.isNew && !this.password.match(specialChar)) {
    this.invalidate('password', 'Password must contain at least one special character: !@£$%&*')
  };
  if (this.isNew && !this.password.toUppercase() === password) {
    this.invalidate('password', 'Password must contain an uppercase')
  };
});


module.exports = User;