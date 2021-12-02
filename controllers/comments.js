var Post = require('../models/comment');

var CommentsController = {
  Create: function(req, res) {
    const comment = new Post({
      comment: req.body.comment,
      user_name: req.session.user.email, 
      user_id: req.session.user.email._id,
      post_id: req.body.post_id,
      });
    comment.save(function(err) {
      if (err) { throw err; }

      res.status(201).redirect('/posts');
    });
  }
};

module.exports = CommentsController;
