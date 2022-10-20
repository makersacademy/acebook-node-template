const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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
    min: 6,
  },

  requests: [{
    type: Schema.Types.ObjectId,
    ref: "User",
    // unique: true,
  }],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: "User",
    // unique: true,
  }],

  photo: {
    data: Buffer,
    contentType: String,
    code: String,
    photoExists: Boolean,
  },
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if (err) return next(err);
    this.password = passwordHash;
    next();
  });
});

UserSchema.methods.comparePassword = function (candidatePassword) {
  const currentPassword = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, currentPassword, function (err, isMatch) {
      if (err) return reject(err);
      resolve(isMatch);
    });
  });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
