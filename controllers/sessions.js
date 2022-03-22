const User = require("../models/user");

const SessionsController = {
  New: (req, res) => {
    res.render("sessions/new", {});
  },
  Create: (req, res) => {
    console.log("trying to log in");
    const email = req.body.email;
    const password = req.body.password;
    console.log(email)
    User.findOne({ email: email })
    .then(user => {
      if (!user) {
        console.log(user)
        return res.json({message: "no user found"});
      } else if (user.password != password) {
        return res.json({message: "password incorrect"});
      } else {
        console.log({message:"signed in successfuly"})
        req.session.user = user;
        res.json({user:req.session.user});
      }
    });
  },

  Destroy: (req, res) => {
    console.log("logging out");
    if (req.session.user && req.cookies.user_sid) {
      res.clearCookie("user_sid");
    }
    res.redirect("/sessions/new");
  },
};

module.exports = SessionsController;
