const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "Acebook" });
  },
  SearchIndex: (req, res) => {
    res.render('search/index');
  },
};

module.exports = HomeController;
