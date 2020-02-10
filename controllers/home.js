var HomeController = {
  Index: function(req, res) {
    res.render('home/index', { title: 'AceBook' });
  }
};

module.exports = HomeController;
