const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "Acebook!", loggedIn: req.session.loggedIn });
  },
};

module.exports = HomeController;
