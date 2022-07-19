const User = require("../models/user");
const bcrypt = require("bcrypt");



const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

 Create: async (req, res, ) => {
    
     
    if (!(req.body.email && req.body.password)) {
      return res.status(400).send({ error: "Data not formatted properly" });
    } 
    const firstNameCapitalized = req.body.firstName[0].toUpperCase() + req.body.firstName.substring(1).toLowerCase();
    const lastNameCapitalized = req.body.lastName[0].toUpperCase() + req.body.lastName.substring(1).toLowerCase();
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      firstName: firstNameCapitalized,
      lastName: lastNameCapitalized,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    console.log(user.password)
    await user.save().then((doc) => res.status(201).redirect("/sessions/new"));
  }
};


module.exports = UsersController;
