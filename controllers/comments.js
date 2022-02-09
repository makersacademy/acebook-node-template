var Comment = require('../models/comments');

var CommentsController = {
  Index: function(req, res) {
    var post_id = req.params.id;
    Comment.find({postID: post_id}).exec(function (err, comments){
      res.render('comments/index', {post_id: req.params.id, post_comments:comments} )
    });
  
  },

  New: function(req,res){
    res.render('comments/new', {post_id: req.params.id});
  },

  Create: function(req, res) {
    var post_id = req.params.id;
    var comment_body = req.body.comment;
    var new_comments = new Comment({comment:comment_body, postID: post_id});
    new_comments.save();
    res.redirect('/posts');
  }
};

module.exports = CommentsController;
