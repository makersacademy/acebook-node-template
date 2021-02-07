var Content = require('../models/content');

var ContentController = {
  Index: function(req, res) {
    Content.find(function(err, content) {
      if (err) { throw err; }

      res.render('content/index', { content: content });
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
