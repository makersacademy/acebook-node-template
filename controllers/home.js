const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "Acebook", user: req.session.user });
  },
};

module.exports = HomeController;
