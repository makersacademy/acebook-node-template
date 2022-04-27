const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "Welcome to Acebook" });
  },
};

module.exports = HomeController;
