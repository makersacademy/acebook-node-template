var HomeController = {
  Index: function(req, res) {
    var loggedIn = req.cookies.userId
    res.render('home/index', { title: 'WTfacebook', loggedIn: loggedIn });
  }
};

module.exports = HomeController;
