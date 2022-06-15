const HomeController = {
  Index: (req, res) => {
    res.render("home/index", {
      session: req.session.user,
      title: "Acebook",
    });
  },
};

module.exports = HomeController;
