const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "TasteBook" });
  },
};

module.exports = HomeController;
