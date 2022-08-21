const User = require("../models/user");
const bcrypt = require("bcrypt");


const SessionsController = {
  New: (req, res) => {
    res.render("sessions/new", {});
  },

  Error: (req, res) => {
    res.render("sessions/new/error", {});
  },


  Create: async (req, res) => {
    const body = req.body;
    const user = await User.findOne({ email: body.email });
    if (user) {
     
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {
        res.status(200)
        req.session.user = user;
        res.redirect("/posts");
        
      } else {
        res.status(400).redirect("sessions/new/error");
      }
    } else {
      res.status(401).redirect("sessions/new/error");
    }
     
    
    
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
