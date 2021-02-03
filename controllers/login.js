var LoginController = {
  Login: function(req, res) {
      res.render('home/login', { title: 'Acebook' });
  }
  };
  
  module.exports = LoginController;
  