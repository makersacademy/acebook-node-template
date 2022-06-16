const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { 
      title: "Acebook",
      session: req.session.user,
      profilePhoto: req.session.profilePhotoPath
    });
    console.log(req.session)
  },
};

module.exports = HomeController;
