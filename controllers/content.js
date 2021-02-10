var Content = require('../models/content');
var App = require('../app');
session = App.session;

var ContentController = {
  Index: function(req, res) {
    Content.find(function(err, content) {
      if (err) { throw err; }
      if (!req.session.user){
        console.log('There is no session')
        return res.status(401).redirect('/');
      }
      else{
        res.render('content/index', { content: content });
      }

    });
  },
  New: function(req, res) {
    res.render('content/new', {});
  },
  Create: function(req, res) {
    var content = new Content(req.body);
    content.save(function(err) {
      if (err) { throw err; }

      res.status(201).redirect('/content');
    });
  }
};

module.exports = ContentController;
