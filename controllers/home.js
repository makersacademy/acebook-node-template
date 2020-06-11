var HomeController = {

  Index: function(request, response) {
    if (request.session.user) {
      response.render('newsfeed/index', {})
    } else {
      var message = request.session.errorMessage;
      request.session.errorMessage = undefined;
      response.render('user/login.hbs', {errorMessage: message})
    }
  },
};

module.exports = HomeController;
