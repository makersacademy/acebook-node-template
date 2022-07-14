const Comment = require("../models/comment");

const CommentsController = {
  Create: (req, res) => {
    req.body = {
      message: req.body.message,
    };
    const comment = new Comment(req.body);
    comment.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
    });
  },
};

module.exports = CommentsController;
