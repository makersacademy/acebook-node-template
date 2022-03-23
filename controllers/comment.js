const Comment = require("../models/comment");
const Post = require("../models/post");

const CommentController = {
  Index: (req, res) => {
    Comment.find({post: req.query.id}, 'comment createdAt', {sort: {'createdAt': -1}}, (err, comment) => {
      if (err) {
        throw err;
      }
      res.render("comment/index", { comment: comment, post_id: req.query.id });
    }).populate('user');
  },

  New: (req, res) => {
    res.render("comment/index", {} );
  },

  Create: (req, res) => {

    const comment = new Comment({user: req.session.user._id, comment: req.body.comment, post: req.body.post_id});
    comment.save((err) => {
      if (err) {
        throw err;
      }
      Post.findOne({_id: req.body.post_id}).exec().then((post) => {
        post.comments.push(comment)
        post.save()
      })

      res.status(201).redirect(`/posts/`);
    });
  },
};

module.exports = CommentController;