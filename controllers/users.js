const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
    });
  },

  Profile: (req, res) => { 
    const user = req.session
    res.render("users/profile", {user: user})
  }, 

  Friend: (req, res) => { 
    // console.log(req)
    res.render("users/friendprofile")
  }
};

module.exports = UsersController;