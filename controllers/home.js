const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "Makebook", newUser: true });
  },
};

module.exports = HomeController;
