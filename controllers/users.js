const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: (req, res) => {
    // var query = {'firstName': req.user.firstName};
    // req.newData.firstName = req.user.firstName;
    // User.findOneAndUpdate(query, req.newData, {upsert: true}, function(err, doc) {
    const firstNameCapitalized = req.body.firstName[0].toUpperCase() + req.body.firstName.substring(1).toLowerCase();
    const lastNameCapitalized = req.body.lastName[0].toUpperCase() + req.body.lastName.substring(1).toLowerCase();
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      firstName: firstNameCapitalized,
      lastName: lastNameCapitalized,
    });
    user.save((err) => {
      if (err) {
        throw err;
      }
    

      res.status(201).redirect("/posts");
    });
  },
};

module.exports = UsersController;
