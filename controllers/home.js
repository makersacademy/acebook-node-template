const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "fAcebook" });
  },
};

module.exports = HomeController;
