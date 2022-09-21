const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "Acebook" , signedIn: req.body.signedIn});
  },
};

module.exports = HomeController;
