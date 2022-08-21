const Comment = require("../models/comment");
const Post = require("../models/post");

const CommentsController = {
  Index: (req, res) => {

    Comment.find((err, comments) => {
      if (err) {
        throw err;
      }
      res.render("posts/index", { comments });
    });

    
  },
  Create: (req, res) => {
    const comment = new Comment({
      postID: req.body.postID,
      comment: req.body.comment
    });
    comment.save((err) => {
      if (err) {
        throw err;
      }

      Post.findByIdAndUpdate({_id: req.body.postID}, { $push: {comments: comment._id }}, {new: true, useFindAndModify: false}, (err) => {
        console.log(`error:${err}`)
      })
      res.status(201).redirect("/posts");
    });
  }

};

module.exports = CommentsController;