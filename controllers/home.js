const User = require("../models/user");

const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "Acebook" });
  },
  
  SearchIndex: (req, res) => {
    res.render('search/index');
  },

  Search: (req, res) => {
    // returning all users whose first name matches the search word
    User.find({ firstName: req.body.search }, (err, userData1) => {
      if (err) {
        throw err;
      }
      // returning all users whose last name matches the search word
      User.find({ lastName: req.body.search }, (err, userData2) => {
        if (err) {
          throw err;
        }
        // passing both lists of users to the view
        res.render('search/results', { users1: userData1, users2: userData2 })
      })
    })
  }
};

module.exports = HomeController;
