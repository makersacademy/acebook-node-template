var SignupController = {
    Index: function(req, res) {
      res.render('signup/index', { title: 'Sign up' });
    }
  };
  module.exports = SignupController;
