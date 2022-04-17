const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "Acebook", session: req.session, layout: false });
  },
};

module.exports = HomeController;
