const res = require("express/lib/response");
const User = require("../models/user");

const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "Acebook" });
  },
  Login: (req, res) => {
    res.render("sessions/new", {});
    // when I call login, I want a return the sessions/new page
  },
  SearchIndex: (req, res) => {
    res.render("search/index");
    // renders a new search index page
  },
  Search: (req, res) => {
    // returning all users whose first name matches the search word
    const firstName = req.body.firstName;
    console.log(firstName);
    User.findOne({ firstName: firstName }, (err, user) => {
      if (err) {
        throw err;
      }
      // returning all users whose last name matches the search word
      // User.find({ lastName: req.body.search }, (err, userData2) => {
      //   if (err) {
      //     throw err;
      //   }
      // passing both lists of users to the view
      console.log(user);
      res.render("search/results", { user: user });
      // })
    });
  },
};

// method to go to homepage

module.exports = HomeController;
