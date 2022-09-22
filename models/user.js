const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  username: String,
});

const User = mongoose.model("User", UserSchema);



UserSchema.path("password").validate(function passwordValidator(password) {
  let specialChar =~ /[a-z][A-Z][!@£$%&*]/;

  if (this.isNew && !this.password.length < 7) {
    this.invalidate('password', 'Password should be longer than 7 characters or more')
  };
  if (this.isNew && !this.password.match(specialChar)) {
    this.invalidate('password', 'Password must contain at least one special character: !@£$%&*')
  };
  if (this.isNew && !this.password.toUppercase() === password) {
    this.invalidate('password', 'Password must contain an uppercase')
  };
  if (this.isNew && this.password.length === 0) {
    this.invalidate('password', 'Password is required')
  };
});

module.exports = User;
