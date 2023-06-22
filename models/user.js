const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  // posts: [
  //   {
  //     content: String,
  //     author: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "User",
  //     },
  //   },
  // ],
});

UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email }).exec(function (err, user) {
    if (err) {
      return callback(err);
    } else if (!user) {
      err.status = 401;
      return callback(err);
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (result === true) {
        return callback(null, user);
      } else {
        return callback();
      }
    });
  });
};

UserSchema.pre("save", function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
