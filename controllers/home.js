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
};

module.exports = HomeController;
