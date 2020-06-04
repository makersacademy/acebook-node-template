var HomeController = {
  Index: function(req, res) {
    //find <<
    res.render('home/index', { title: 'Acebook' });
  }
};

module.exports = HomeController;
