const User = require("../models/user");

const ProfileController = {
  Index: (req, res) => {
    res.render("profile/index", {
      title: "Acebook",
      firstName: req.session.user["firstName"],
      url: req.session.user["profilePic"],
      lastName: req.session.user['lastName'],
      email: req.session.user['email'],
      password: "*".repeat(req.session.user['password'].length)
    });
  },

  Edit: (req, res) => {
    res.render("profile/edit", {
      title: "Acebook",
      firstName: req.session.user["firstName"],
      url: req.session.user["profilePic"],
      lastName: req.session.user['lastName'],
      email: req.session.user['email'],
      password: "*".repeat(req.session.user['password'].length)
    });
  },

  EditUser: async (req, res) => {

    let newDetails = req.body
    let currentUser = req.session.user
    
    const existingUser = await User.findOne({email: currentUser.email})

    const keys = ["email", "password", "firstName", "lastName", "profilePic"]

    keys.forEach((key)=> {
      if(newDetails[key] != ""){
        existingUser[key] = newDetails[key]
      }
      })

    req.session.user = existingUser
    await existingUser.save()

    res.status(201).redirect(`/profile`);
  }
}

module.exports = ProfileController;
