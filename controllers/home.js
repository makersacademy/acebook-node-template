const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "Bettah" });
  },
};

module.exports = HomeController;
