var LogoutController = {
    Destroy: function(req, res) {
        req.session.destroy();
        res.status(201).redirect('/');
    }
  };
  
  module.exports = LogoutController;
  