const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: (req, res) => {
    // check if the required details are submitted
    if (
      req.body.firstName == "" ||
      req.body.password == "" ||
      req.body.email == ""
    ) {
      res.render("users/new", { error: "Please enter the required details" });
    } else {
      
      const defaultCheck = req.body
      if(defaultCheck.profilePic == ""){
        delete defaultCheck.profilePic
      }
      
      const user = new User(defaultCheck);

      // check if user exists before creating
      User.findOne({ email: user.email }).then((found) => {
        if (found) {
          console.log(`User ${found.email} already exists!`);
          res.redirect("/");
        } else {
          user.save((err) => {
            if (err) {
              throw err;
            }
            // log in automatically after signup
            req.session.user = user;
            res.status(201).redirect("/posts");
          });
        }
      });
    }
  },
};

module.exports = UsersController;
