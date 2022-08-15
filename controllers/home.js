const res = require("express/lib/response");

const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "Acebook" });
  },
  Login: (req, res) => {
    res.render("sessions/new", {});
    // when I call login, I want a return the sessions/new page
  },
  SearchIndex: (req, res) => {
    res.render('search/index');
    // renders a new search index page
  }
};

// method to go to homepage

module.exports = HomeController;
