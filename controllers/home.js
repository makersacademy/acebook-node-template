var User = require('../models/user');

var HomeController = {
  Index: function(req, res) {
    res.render('home/index', { title: 'Acebook' });
  },

  Greeting: function showFlashMessage(element) {
    var event = new CustomEvent('showFlashMessage');
    element.dispatchEvent(event);

    var flashMessages = document.getElementsByClassName('js-flash-message');
    //show first flash message available in your page
    showFlashMessage(flashMessages[0]);
  },  

  Create: function(req, res) {
    var user = new User(req.body);
    user.save(function(err) {
      if (err) { throw err; }

      res.status(201).redirect('/');
    });
  }  
  
};

module.exports = HomeController;
