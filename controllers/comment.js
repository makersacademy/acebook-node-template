const Comment = require("../models/comment");
const Post = require("../models/post");

const CommentController = {
  Index: (req, res) => {
    Comment.find({}, 'comment createdAt', {sort: {'createdAt': -1}}, (err, comment) => {
      if (err) {
        throw err;
      }
      res.render("comment/index", { comment: comment });
    }).populate('user');
  },

  New: (req, res) => {
    res.render("comment/index", {} );
  },

  Create: (req,res) => {
    const comment = new Comment({user: req.session.user._id, post: req.body.message, comment: req.body.comment});
    comment.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/comment");
    });
  },

  LinkPost: (req, res) => {
    Post.findOne({_id: req.body.post_id}, function(err, post) {
      console.log(post.message);
      post.ref = post._id;
    });
    
    res.render("comment/index", {} );
  }
};

module.exports = CommentController;