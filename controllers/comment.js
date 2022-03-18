const Comment = require("../models/comment");

const CommentController = {
  New: (req, res) => {
    res.render("comment/new", {} );
  },

  Create: (req,res) => {
    const comment = new Comment({comment: req.body.comment});
    comment.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
};

module.exports = CommentController;