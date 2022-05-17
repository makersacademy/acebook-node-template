const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "Acebook", user: req.session.user });
  },

  Contact: (req, res) => {
    res.render("home/help", {user: req.session.user});
  },
};

module.exports = HomeController;
