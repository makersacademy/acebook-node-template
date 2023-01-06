const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {shownavbar:true});
  },

  Create: (req, res) => {
    const newuser = new User(req.body);
    const email = req.body.email
    User.findOne({ email: email }).then((user) => {
      //if user doesn't exist in the db, redirects to /new which creates a new account
      if (!user)       {
        newuser.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
    })}
    //if user doesn't exist, save it
      else
      {
        console.log('User already exists!')
        var emailExists = true;
        res.render("home/index", {emailExists})
      } 
    })
  }
}

module.exports = UsersController;