const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    validate: [
      {
        validator: function lengthValidator(value) {
          return value.length >= 8;
        },
        message: "Password is too short. At least 8 characters.",
      },
    ],
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 25,
  },
  image: {
    type: String,
    default: "",
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  // Password hashing
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  // Unique check for email
  const foundEmail = await this.model("User").findOne({ email: user.email });
  if (foundEmail && foundEmail._id.toString() !== user._id.toString()) {
    const error = new Error("Email already in use.");
    error.code = 11000;
    return next(error);
  }

  // Unique check for username
  const foundUsername = await this.model("User").findOne({
    username: user.username,
  });
  if (foundUsername && foundUsername._id.toString() !== user._id.toString()) {
    const error = new Error("Username already in use.");
    error.code = 11000;
    return next(error);
  }

  next();
});

module.exports = mongoose.model("User", userSchema);
