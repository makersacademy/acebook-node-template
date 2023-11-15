const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "Bassbook" });
  },
};

module.exports = HomeController;
