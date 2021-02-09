var Content = require('../models/content');
var User = require('../models/users');

var ContentController = {
  Index: function(req, res) {
    // display all posts
    Content.find(function(err, post) {
      if (err) { throw err; }

      res.render('content/index', { content: post });
    });
  },
  New: async (req, res) => {
    res.render('content/new', { 
      content: new Content(),
      title: 'Add new post' 
    });
  },
  Create: async (req, res) => {
    const post = req.body.post;

    const content = new Content({
      post: post
    });

    await content.save((err) => {
      if (err) {
        res.redirect('content/new');
      } else {
        res.status(201).redirect('/content');
      };
    });
  }
};

module.exports = ContentController;
