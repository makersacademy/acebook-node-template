const HomeController = {
  Index: (req, res) => {

    res.render("home/index", { title: "Acebook!", loggedIn: req.session.loggedIn, username: req.session.username });
  },
};

module.exports = HomeController;