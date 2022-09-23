const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'], 
  },
  password: String,
  username: String,
});

// UserSchema.path('email').validate(async(email) => {
//   const email_length = await email.length;
//   if (email_length === 0) {
//     return false
//   }
//   else
//     return true
// }, 'No email entered')

UserSchema.path('email').validate(async(email) => {
  const email_count = await mongoose.models.User.countDocuments({email})
  if (email_count === 0) {
    return true
  }
  else
    return false
}, 'Email already exists')

const User = mongoose.model("User", UserSchema);




UserSchema.path("password").validate(function passwordValidator() {
 
  let lowCaseChar = /[a-z]/;
  let upCaseChar = /[A-Z]/;
  let numberChar = /[0-9]/;
  let specialChar = /[!@£$%&*]/;

  if (this.isNew && this.password.length === 0) {
    this.invalidate('password', 'Password is required')
  };
  if (this.isNew && this.password.length < 7) {
    this.invalidate('password', 'Password should be longer than 7 characters or more')
  };
  if (this.isNew && !this.password.match(upCaseChar)) {
    this.invalidate('password', 'Password must contain at least one uppercase letter: A-Z')
  };
  if (this.isNew && !this.password.match(lowCaseChar)) {
    this.invalidate('password', 'Password must contain at least one lowercase letter: a-z')
  };
  if (this.isNew && !this.password.match(numberChar)) {
    this.invalidate('password', 'Password must contain at least one number: 0-9')
  };
  if (this.isNew && !this.password.match(specialChar)) {
    this.invalidate('password', 'Password must contain at least one special character: !@£$%&*')
  };
});


module.exports = User;