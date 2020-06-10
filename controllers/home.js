var HomeController = {

  Index: function(req, res) {
    if (req.session.user) {
      res.render('newsfeed/index', {})
    } else {
      var message = req.session.errorMessage;
      req.session.errorMessage = undefined;
      res.render('user/login.hbs', {errorMessage: message});
    }
  },
};

module.exports = HomeController;
