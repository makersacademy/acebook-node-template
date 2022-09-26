const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "Acebook", session: req.session });
  },

  Error: (req, res) => {
   res.render("signinerror", {});
  },

  SignupError: (req, res) => {
    res.render("signuperror", {});
   },
};

module.exports = HomeController;
