var HomeController = {

  Index: function(req, res) {
    if (req.session.user) {
      res.render('newsfeed/index', {})
    } else {
      res.render('user/login.hbs')
    }
  },
};

module.exports = HomeController;
