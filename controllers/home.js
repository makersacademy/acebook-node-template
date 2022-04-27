const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "Acebook", hideNavbar: true });
  },
};

module.exports = HomeController;
