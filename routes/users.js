const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { body, validationResult } = require("express-validator");

const UsersController = require("../controllers/users");

const newUserValidationCriteria = [
  body("firstName")
    .isAlpha()
    .withMessage(
      "Your first name must contain letters only and be 2 to 20 characters long."
    ),
  body("lastName")
    .isAlpha()
    .withMessage(
      "Your last name must contain letters only and be 2 to 20 characters long."
    ),
  body("username")
    .isAlphanumeric()
    .withMessage(
      "Your password must contain at least 1 uppercase letter, 1 symbol and 1 digit, and must longer than 8 characters."
    ),
  body("username").custom((value) => {
    return User.find({
      username: value,
    }).then((user) => {
      if (user.length > 0) {
        return Promise.reject("Username already in use");
      }
    });
  }),
  body("email").isEmail().withMessage("Please enter a valid email."),
  body("email").custom((value) => {
    return User.find({
      email: value,
    }).then((user) => {
      if (user.length > 0) {
        return Promise.reject("Email already in use");
      }
    });
  }),
  body("password")
    .not()
    .isEmpty()
    .isStrongPassword()
    .withMessage(
      "Your username must contain letters and digits only and be 5 to 20 characters long."
    ),
  body("confirmPassword", "Passwords do not match").custom(
    (value, { req }) => value === req.body.password
  ),
  body("phoneNumber")
    .optional({ nullable: true })
    .isMobilePhone()
    .withMessage("Please enter valid mobile phone number."),
];

router.get("/new", UsersController.New);
// router.post("/", newUserValidationCriteria, UsersController.Create);
router.post("/", UsersController.Create);
router.get("/profile/:username", UsersController.Profile);
router.get("/search", UsersController.Search);

module.exports = router;
