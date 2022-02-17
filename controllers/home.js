var HomeController = {
  Index: function(req, res) {
    res.render('home/index', { title: 'Flamingo Lingo', layout: '/layoutHomepage' });
  }
};

module.exports = HomeController;
