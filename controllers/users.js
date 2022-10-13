const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: (req, res) => {
    const user = new User();
    let errorMessage = "";
    user.name = req.body.name;
    user.email = req.body.email;
    user.photo_link = 'https://i0.wp.com/ih1.redbubble.net/image.1046392292.3346/st,small,507x507-pad,600x600,f8f8f8.jpg';
    if (req.body.password1 === req.body.password2) {
      user.password = req.body.password1;    
      user.save((err) => {
        if (err) {
          errorMessage = "Email already exists."
          res.render("users/new", {error: errorMessage});
          // throw err;
        } else {
          req.session.user = user;
          res.status(201).redirect("/posts");
        }
      });
    
    } else {
      errorMessage = "Passwords do not match";
      res.render("users/new", {error: errorMessage});
    }
    

  },
};

module.exports = UsersController;
