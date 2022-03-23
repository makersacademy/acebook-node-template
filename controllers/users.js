const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: (req, res) => {
    const user = new User(req.body);
    user.save()
    //this is what we need to write to send the response as json to be read by react
    .then(user=> {
      res.json({message:"saved succesfully"})
      //this catches any errors and posts them to console. This would show up in the temrinal. If we console
      //log in react it will show up in the dev tools console.
    }).catch(err=>{
      console.log(err)
    })
  },
};

module.exports = UsersController;
