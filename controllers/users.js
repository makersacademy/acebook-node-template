const User = require("../models/user");

const UsersController = {

  Show: (req, res) => {
    console.log("Params", req.params.id)
    let user
    User.findById(req.params.id)
    .then( (user) => {
      if (!user) { throw err } //should add a 404 page for our errors
      res.render("users/show", { user: user });
    }) 
  
  },


  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
    });
  },



};

module.exports = UsersController;
