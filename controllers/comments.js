var Comment = require('../models/comment');

var CommentsController = {
    Index: function(req, res) {
        Comment.find(function(err, comments) {
            if (err) { throw err; }
            
            res.json({comments: comments});
          });
    },
    Create: function(req, res) {
        var comment = new Comment({
            postId: req.body.postId,
            comment: req.body.comment,
            author: req.body.author
          });
          comment.save(function(err) {
            if (err) { throw err; }
          });
          res.json({comment: comment});
    }
  };
  
  module.exports = CommentsController;