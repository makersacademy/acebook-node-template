 const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {layout: false});
  },

  Create: (req, res) => {
    const user = new User();
    let errorMessage = "";
    user.name = req.body.name;
    user.email = req.body.email;
    
    if (req.body.password1 === req.body.password2) {
      user.password = req.body.password1;  
       
      let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
      let nameRegex = /^[a-zA-Z ,.'-]+$/;
      if ( user.password.match(passwordRegex) && user.name.match(nameRegex)) {        
        user.save((err) => {
        if (err) {
          errorMessage = "Email already exists."
          res.render("users/new", {layout: false, error: errorMessage});
          // throw err;
        } else {
          req.session.user = user;
          res.status(201).redirect("/posts");
        }});
      } else if (!user.name.match(nameRegex)){
        errorMessage = "Please enter a valid name"
        res.render("users/new", {layout: false, error: errorMessage});
      } else {
        errorMessage = "Password must be 8-15 characters and contain an uppercase, lowercase, numeric and special character"
        res.render("users/new", {layout: false, error: errorMessage});
      } 
    } else {
      errorMessage = "Passwords do not match";
      res.render("users/new", {layout: false, error: errorMessage});
    }
  },
};

module.exports = UsersController;
