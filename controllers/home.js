const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "Acebook" });
  },
  Search: (req, res) => {
    res.render('search/index');
  },
};

module.exports = HomeController;
