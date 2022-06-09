const Comment = require("../models/comment");

const CommentsController = {
  New: (req, res) => {
    res.render("comments/new", { user_id: req.session.user._id, post_id: req.body.post_id });
    console.log(req);
  },

  Create: (req, res) => {
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
