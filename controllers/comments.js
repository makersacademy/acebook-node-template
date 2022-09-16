const Comment = require("../models/comment");
const Post = require("../models/post");

const CommentsController = {
  Index: (req, res) => {
    const postId = req.params.postId;
    const currentUserId = req.session.user._id;
    Comment.find({ post_id: postId })
      .populate("post_id")
      .populate("user_id")
      .exec((err, comments) => {
        if (err) {
          // do something if there's an error
          console.log("CommentsPage.index error with Comment.find");
          console.log(err);
        } else {
          Post.findOne({ _id: postId })
            .populate("user_id")
            .exec((err, post) => {
              if (err) {
                console.log(err);
              } else {
                console.log(comments);
                comments.forEach((comment) => {
                  comment._doc.belongsToCurrentUser =
                    comment.user_id._id.toString() === currentUserId;
                  comment._doc.likedByCurrentUser =
                    comment.likes.includes(currentUserId);
                });
                res.render("comments/index", {
                  comments: comments.reverse(),
                  post: post,
                });
              }
            });
        }
      });
  },

  Create: (req, res) => {
    const postId = req.params.postId;
    const today = new Date();
    const time =
      today.getFullYear() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getDate() +
      " " +
      today.getHours() +
      ":" +
      today.getMinutes();

    const comment = new Comment({
      message: req.body.message,
      user_id: req.session.user._id,
      post_id: postId,
      time_posted: time,
    });

    comment.save((err) => {
      if (err) {
        throw err;
      } else {
        Post.findByIdAndUpdate(
          { _id: postId },
          { $inc: { comments_counter: 1 } }
        ).exec((err) => {
          if (err) {
            throw err;
          }
          res.redirect("/comments/" + postId);
        });
      }
    });
  },

  Destroy: (req, res) => {
    const commentId = req.params.commentId;
    console.log("delete comment request made");
    Comment.findOne({ _id: commentId }, (err, comment) => {
      if (err) {
        // do something if error
        throw err;
      } else if (!comment) {
        // do something if post doesn't exist
      } else if (comment.user_id.toString() !== req.session.user._id) {
        // do something if right post but wrong user
        res.send("User IDs do not match");
      } else {
        console.log("attempting to delete comment");
        // do something if post exists and right user
        Comment.deleteOne({ _id: comment }, (err, result) => {
          if (err) {
            // do something if error
            throw err;
          } else {
            console.log(`Comment ${commentId} deleted`);
            Post.findByIdAndUpdate(
              { _id: comment.post_id },
              { $inc: { comments_counter: -1 } }
            ).exec((err) => {
              if (err) {
                throw err;
              }
              res.send(JSON.stringify(result));
            });
          }
        });
      }
    });
  },
};

module.exports = CommentsController;
