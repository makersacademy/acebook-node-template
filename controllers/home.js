const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "Acebook" , signedIn: req.session.signedIn});
  },
};

module.exports = HomeController;
