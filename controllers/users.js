const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", { session: req.session });
  },

  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        console.log(err);
        res.status(409).render("users/new", { 
          error: 'User already exists!', 
          name: req.name, 
          surname: req.surname});
      } else {
      res.status(201).redirect("/posts");
      }
    });
  },
  SelfProfile: (req, res) => {
    // console.log(req.session.user.email);
    res.render("users/profile", {session: req.session})

  },
  ShowProfile: (req, res) => {
    
  }
};

module.exports = UsersController;
