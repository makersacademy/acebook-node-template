const User = require("../models/user");

const ProfileController = {
  Index: (req, res) => {
  

    res.render("profile/index", {
      title: "Acebook",
      name: req.session.user["firstName"],
      url: req.session.user["profilePic"],
      surname: req.session.user['surname'],
      email: req.session.user['email'],
      password: "*******"
    });
  },

  Edit: (req, res) => {
    const user = new User(req.body);
    User.findOne({email: user.email}).then(
      user.updateOne(()=>{
        // user.firstName = 
      })
    )
  }
};

module.exports = ProfileController;
