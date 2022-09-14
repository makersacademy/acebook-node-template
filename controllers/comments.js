const Comment = require("../models/comment");

const CommentsController = {
  Index: (req, res) => {
    console.log("Comment page works!");
    const friends = [req.session.user._id, ...req.session.user.friends];

    Comment
      .find({ user_id: { $in: friends }})
      .populate('user_id')
      .exec((err, comments) => {
        if (err){
          // do something if there's an error
          console.log("PostsPage.index error with Post.find");
          console.log(err);
        } else {
          res.render("comments/index", { comments: comments.reverse() });
        }
      });
  },

  Create: (req, res) => {
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
