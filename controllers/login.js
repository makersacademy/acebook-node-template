var LoginController = {
    Index: function(req, res) {
      res.render('login/index');
    }, 
    Dashboard: function(req,res) {
      res.redirect('posts');
    }
  };
  
  module.exports = LoginController;