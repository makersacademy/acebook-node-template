const User = require("../models/user");
//this has been imported and installed and required to have passwords encrypted.
//it is called in the signup and sign in functions. It now stores the user with a hashed password in local storage
const bcrypt = require('bcrypt');

const SessionsController = {
  New: (req, res) => {
    res.render("sessions/new", {});
  },
  Create: (req, res) => {
    console.log("trying to log in");
    const email = req.body.email;
    const password = req.body.password;
    if(!email || !password){
      res.status(422).json({error: 'please fill in all details'})
    }
    User.findOne({ email: email })
    .then(savedUser=>{
      if(!savedUser){
        return res.status(422).json({error: "invalid email or password"})
        
      }
      bcrypt.compare(password, savedUser.password)
      .then(passwordsMatch => {
        if(passwordsMatch){
          console.log({message:"signed in successfuly"})
          req.session.user = savedUser;
          res.json({user:req.session.user});
        }else{
          return res.status(422).json({error: "invalid email or password"})
        }
      }).catch(err=>{
      console.log(err)
      })
    })
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
