var HomeController = {
  Index: function(req, res) {
    if(req.cookies.userId) {
      res.redirect("/posts");
    }
    res.render('home/index', { title: 'Acebook' });
  }
};

module.exports = HomeController;
