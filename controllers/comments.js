const Comment = require("../models/comment");

const CommentsController = {
  Index: async (req, res) => {
    Comment.find((err, comments) => {
      if (err) {
        throw err;
      }
      res.render("comments/index", { comments: comments.reverse(), signedIn: req.session.signedIn});
    });
  },

  New: (req, res) => {
    res.render("comments/new", {signedIn: req.session.signedIn});
  },

  Create: (req, res) => {
    req.body.username = req.session.user.username;
    const comment = new Comment(req.body);
    comment.user = req.session.user._id
    comment.post = req.params.postId
    comment.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("back");
    });
  },
};

module.exports = CommentsController;
