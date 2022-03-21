const Comment = require("../models/comment");

const CommentController = {
  Index: (req, res) => {
    Comment.find({}, 'comment createdAt', )
  }

  New: (req, res) => {
    res.render("comment/new", {} );
  },

  Create: (req,res) => {
    const comment = new Comment({post: req.session.post._id, comment: req.body.comment});
    comment.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("comment/new");
    });
  },
};

module.exports = CommentController;