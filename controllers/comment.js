const Comment = require("../models/comment");

const CommentController = {
  Index: (req, res) => {
    Comment.find({}, 'comment createdAt', (err, comment) => {
      if (err) {
        throw err;
      }
      res.render("comment/new", { comment: comment });
    }).populate('user');
  },

  New: (req, res) => {
    res.render("comment/new", {} );
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
};

module.exports = CommentController;