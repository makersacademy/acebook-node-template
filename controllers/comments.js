const Comment = require("../models/comment");

const CommentsController = {
  Index: (req, res) => {
    const friends = [req.session.user._id, ...req.session.user.friends];

    Comment
      .find((err, comments) => {
        if (err){
          // do something if there's an error
          console.log("CommentsPage.index error with Comment.find");
          console.log(err);
        } else {
          res.render("comments/index", { comments: comments.reverse() });
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
