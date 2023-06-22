const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "Acebook", layout: false });
  },
};

module.exports = HomeController;
