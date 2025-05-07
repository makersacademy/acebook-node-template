const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

UserSchema.pre("save", function (next) {
  const user = this;

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
        if (hashError) {
          return next(hashError);
        }

        user.password = hash;
        next();
      })
      }
    })
  } else {
    return next();
  } 
})

const User = mongoose.model("User", UserSchema);

module.exports = User;
