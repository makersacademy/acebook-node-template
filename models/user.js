const mongoose = require("mongoose");
const { body } = require("express-validator");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  image: { type: String, data: Buffer },
  signupDate: {
    type: Date,
    default: () => Date.now(),
  },
});

const UserValidation = [
  body("firstName")
    .isAlpha()
    .isLength({ min: 2, max: 20 })
    .withMessage(
      "Your first name must contain letters only and be 2 to 20 characters long."
    ),
  body("lastName")
    .isAlpha()
    .isLength({ min: 2, max: 20 })
    .withMessage(
      "Your last name must contain letters only and be 2 to 20 characters long."
    ),
  body("username")
    .isAlphanumeric()
    .isLength({ min: 5, max: 20 })
    .withMessage(
      "Your username must contain letters and digits only and be 5 to 20 characters long."
    ),
  body("username").custom(async (value) => {
    const users = await User.find({ username: value });
    if (users.length > 0) {
      return Promise.reject("Username already in use");
    }
  }),

  body("email").isEmail().withMessage("Please enter a valid email."),
  body("email").custom(async (value) => {
    const users = User.find({ email: value });
    if (users.length > 0) {
      return Promise.reject("Email already in use");
    }
  }),
  body("password")
    .not()
    .isEmpty()
    .isStrongPassword()
    .withMessage(
      "Your password must contain at least 1 uppercase letter, 1 symbol and 1 digit, and must longer than 8 characters."
    ),
  body("confirmPassword", "Passwords do not match").custom(
    (value, { req }) => value === req.body.password
  ),
  body("phoneNumber")
    .optional({ checkFalsy: true })
    .isMobilePhone()
    .withMessage("Please enter valid mobile phone number or leave blank"),
];

const User = mongoose.model("User", UserSchema);

module.exports = { User, UserValidation };
