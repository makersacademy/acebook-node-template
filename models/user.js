const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 6
  },
});

UserSchema.pre('save', function(next){
  if(!this.isModified('password'))
    return next();
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if(err)
      return next(err);
    this.password = passwordHash;
    next();
  });
});

// UserSchema.methods.comparePassword = function(candidatePassword, cb) {
//   bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//       if (err) return cb(err);
//       cb(null, isMatch);
//   });
// };
UserSchema.methods.comparePassword = function(candidatePassword) {
  const currentPassword = this.password;
  return new Promise((resolve, reject) => {
      bcrypt.compare(candidatePassword, currentPassword, function(err, isMatch) {
          if (err) return reject(err);
          resolve(isMatch);
      });
  })
  };

const User = mongoose.model("User", UserSchema);

module.exports = User;
