var Comment = require('../models/comment');

var CommentController = {
  Index: function(req, res) {
    Comment.find({}, function(err, comments) {
      if (err) { throw err; }

      res.render('posts/comments', { comments: comments });
    }).sort({ 'created_on': -1 });
  },
  New: function(req, res) {
    var comment = new Comment({ comment: req.body.comment });
    console.log('!bug fixing!')
    comment.save(function(err) {
      if (err) { throw err; }

      res.status(201).redirect('/posts/comments/all');
    });
  }
};

module.exports = CommentController;