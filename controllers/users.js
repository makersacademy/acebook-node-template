const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Redirect: (req, res) => {
    res.redirect("users/new", {});
  },  

  Create: async (req, res) => {
    const user = new User(req.body);

    const userExists = await User.exists({email: user.email})

    if (userExists == false) {
      user.save((err) => {
        if (err) {
          throw err;
        }
      });
      res.redirect("/sessions/new");
    } else {
      res.render("users/new", {message: "User email already exists"})
      // const message = "User exists"
      // res.redirect("/users/new", message)
      // const errorMessage = "User exists"
      // const errorMessage = req.flash("errorMessage", "User already exists")
      // res.send(req.flash('errorMessage'));
      // res.redirect("/users/new")

      // ideally have an else statement that triggers an error to pop up letting the user know 
      // the email is in use and to use another email in an else branch 
      
    }
    
  }
};

module.exports = UsersController;
