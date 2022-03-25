const User = require("../models/user");
const bcrypt = require('bcrypt');

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: (req, res) => {

    const {firstName, lastName, email, password}= req.body
    if(!email || !password|| !firstName || !lastName){
      return res.status(422).json({error: "please add all the fields"})
     }
     User.findOne({email:email})
    .then((savedUser) => {
      if(savedUser){
      return res.status(422).json({error: "user already exists with that email"})
      }

    })
     bcrypt.hash(password, 12)
    .then(hashedpassword=> {
      const user = new User({
        firstName,
        lastName,
        email,
        password: hashedpassword,
      })
      user.save()
      //this is what we need to write to send the response as json to be read by react
      //.then(res => {
        res.status(200).json({message:"Sign up saved succesfully"})
        //this catches any errors and posts them to console. This would show up in the temrinal. If we console
        //log in react it will show up in the dev tools console.
      }).catch(err=>{
        console.log(err)
      })
    //})
  }
};

module.exports = UsersController;
