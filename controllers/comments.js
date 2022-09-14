const Comment = require("../models/comment");

const CommentsController = {
  Index: (req, res) => {
    const postId = req.params.postId;
    console.log("helloooo");
    console.log(postId);

    Comment
      .find((err, comments) => {
        if (err){
          // do something if there's an error
          console.log("CommentsPage.index error with Comment.find");
          console.log(err);
        } else {
          console.log(comments);
          res.render("comments/index", { comments: comments.reverse(), postId: postId });
        }
      });
  },

  Create: (req, res) => {
    const postId = req.params.postId;
    const today = new Date();
    const time = today.getFullYear() + '/' +(today.getMonth()+1) + '/' + today.getDate() +' ' + today.getHours() + ":" + today.getMinutes();
    console.log(time)
    const comment = new Comment({
        message: req.body.message,
        user_id: req.session.user._id,
        post_id: postId,
        time_posted: time
      });
    comment.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/comments/:postId");
    });
  },
};

module.exports = CommentsController;
