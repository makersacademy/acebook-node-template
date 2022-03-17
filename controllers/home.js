const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "Maker Mate" });
  },
};

module.exports = HomeController;
