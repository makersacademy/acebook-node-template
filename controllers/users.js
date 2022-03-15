const User = require("../models/user");

const UsersController = {

  Show: (req, res) => {
    User.findOne({_id: req.params.id })
      .then((user) => { 
        if (!user) { return res.status(404).end() } 
        res.render("users/show", { user: user });
      })
      .catch(err => next(err))
  },

  New: (req, res) => {
    console.log("Params NEW", req.params.id)
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
