const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "Acebook" });
  },

  Error: (req, res) => {
   res.render("signinerror", {});
  },
};

module.exports = HomeController;
