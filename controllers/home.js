const User = require("../models/user");
const newUser = new User()

const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "Acebook" })
  },
};

module.exports = HomeController;
