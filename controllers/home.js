var HomeController = {
  Index: function(req, res) {
    if (req.cookies.CurrentUser) {
      res.redirect('/user/profile')
    } else {
    var error = req.query.error
    res.render('home/index', { title: 'Chipmunk Travel', errorMessage: error });
    }
  },

};

module.exports = HomeController;
