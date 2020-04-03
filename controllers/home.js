var HomeController = {
  Index: function(req, res) {
    res.render('home/index', { title: 'WTfacebook' });
  }
};

module.exports = HomeController;
