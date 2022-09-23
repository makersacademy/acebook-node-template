const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "Acebook", session: req.session });
  },

  Error: (req, res) => {
   res.render("signinerror", {});
  },
};

module.exports = HomeController;
