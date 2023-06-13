const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  //Email is unique


  // name = request.form["name"]
  //       username = request.form["username"]
  //       email = request.form["email"]
  //       phone = request.form["phone"]
  //       password = request.form["password"]
  //       confirm_password = request.form["confirm_password"]

  //       if not user_repository.email_is_unique(email) or not user_repository.username_is_unique(
  //           username
  //       ):
  //           error_message = "Email address or username is already registered"
  //           return render_template("users/sign_up.html", error_message=error_message)



  //Password is valid (8 chars, including number and special char)
  // def password_is_valid(password):
  //   nums = "1234567890"
  //   special_char = "!@#$%^&*()-_=+[]{};:,<.>/?`~"
  //   return (
  //       len(password) >= 8
  //       and any(char in nums for char in password)
  //       and any(char in special_char for char in password)
  //   )



  //Password and confirm password match
  // if not password_is_valid(password):
  //             error_message = "Password must be at least 8 characters long and contain a number and special character"
  //             return render_template("users/sign_up.html", error_message=error_message)

  //         if not password == confirm_password:
  //             error_message = "Passwords do not match"
  //             return render_template("users/sign_up.html", error_message=error_message)

  //Hash password

  try {
    Create: (req, res) => {
      const user = new User(req.body);
      user.save((err) => {
        if (err) {
          throw err;
        }
        res.status(201).redirect("/posts");
      });
    },
  } catch (error) {
    console.error("Error saving user", error.message)
  }
}
module.exports = UsersController;
