var HomeController = {
  Index: function(req, res) {
    res.render('home/index', { title: 'Chipmunk Travel' });
  }
};

module.exports = HomeController;
