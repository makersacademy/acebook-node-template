const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "Maker Mate", user: req.session.user});
  },
};

module.exports = HomeController;
