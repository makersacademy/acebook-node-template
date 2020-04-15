var HomeController = {
  Index: function(req, res) {
    var error = req.query.error
    console.log(error)
    res.render('home/index', { title: 'Chipmunk Travel', errorMessage: error });
  }
};

module.exports = HomeController;
