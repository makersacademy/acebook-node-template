const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "Quackbook" });
  },
};

module.exports = HomeController;
