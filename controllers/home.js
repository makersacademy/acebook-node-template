const HomeController = {
  Index: (req, res) => {
     if (req.session.user && req.cookies.user_sid) {
      res.render("home/index", { title: "Acebook", session: req.session, userLoggedIn: true});
     }
     else {
      res.render("home/index", { title: "Acebook", session: req.session});

     }
  },

  Error: (req, res) => {
   res.render("signinerror", {});
  },

  SignupError: (req, res) => {
    res.render("signuperror", {});
   },
};

module.exports = HomeController;
