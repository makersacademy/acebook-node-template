const Comment = require("../models/comment");

const CommentsController = {
  Create: (req, res) => {
    req.body = {
      commentmessage: req.body.commentmessage,
    };
    const comment = new Comment(req.body);
    comment.save(() => {
      res.redirect("/posts");
    });
  },
};

module.exports = CommentsController;
