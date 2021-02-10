var Content = require('../models/content');
var User = require('../models/users');

var ContentController = {
  Index: async (req, res) => {
    // display all posts in descending order
    await Content.find({}).sort({ createdAt: 'desc' }).exec((err, post) => {
      if (err) { throw err; }

      res.render('content/index', { content: post });
    })
  },
  New: function(req, res) {
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
