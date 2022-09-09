const User = require("../models/user");

const ProfileController = {
  Index: (req, res) => {
    res.render("profile/index", {
      title: "Acebook",
      firstName: req.session.user["firstName"],
      url: req.session.user["profilePic"],
      lastName: req.session.user['lastName'],
      email: req.session.user['email'],
      password: "*******"
    });
  },

  Edit: async (req, res) => {

      await User.findOneAndUpdate(
        { email: req.session.user.email, email: req.body.email },
        { status: 1 }
      )
      // res.status(201).redirect(`/profile`);

    console.log(`this is the request body email ${req.body.email}`) 
    console.log(req.body.email)
    // req.body = submitted by form

    console.log(`this is the user email ${req.session.user.email}`)
    // req.session.user is currently logged in

    // res.status(201).redirect("/profile"); 

    
    res.render("profile/edit", {
      title: "Acebook",
      firstName: req.session.user["firstName"],
      url: req.session.user["profilePic"],
      lastName: req.session.user['lastName'],
      email: req.session.user['email'],
      password: "*******"
    });
  }
}

module.exports = ProfileController;
