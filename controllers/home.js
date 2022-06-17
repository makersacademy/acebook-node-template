const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "makebook", newUser: true });
  },
};

module.exports = HomeController;
