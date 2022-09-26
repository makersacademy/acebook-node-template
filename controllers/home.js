const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "Acebook" });
  },
  MyProfile: (req, res) => {
    // check if logged in
    if (!req.session.user) {
      // if they are not logged in
      res.redirect("/sessions/new");
    } else {
      // if they are logged in
      const user = req.session.user;
      console.log(user);
      res.render("home/myprofile", {
        user: user
      });
    };
  },
};

module.exports = HomeController;
