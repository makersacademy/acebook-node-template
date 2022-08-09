const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "AceBook" });
  },
};

module.exports = HomeController;
