const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    const friends = [req.session.user._id, ...req.session.user.friends];

    Post.find({ user_id: { $in: friends } })
      .populate("user_id")
      .exec((err, posts) => {
        if (err) {
          // do something if there's an error
          console.log("PostsPage.index error with Post.find");
          console.log(err);
        } else {
          res.render("posts/index", { posts: posts.reverse() });
        }
      });
  },

  New: (req, res) => {
    res.render("posts/new", {});
  },

  Create: (req, res) => {
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
    console.log(time);
    const post = new Post({
      message: req.body.message,
      user_id: req.session.user._id,
      time_posted: time,
    });
    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },

  Destroy: (req, res) => {
    const postId = req.params.postId;
    Post.findOne({ _id: postId }, (err, post) => {
      if (err) {
        // do something if error
        throw err;
      } else if (!post) {
        // do something if post doesn't exist
      } else if (post.user_id !== req.session.user._id) {
        // do something if right post but wrong user
      } else {
        // do something if post exists and right user
        Post.deleteOne({ _id: postId }, (err, result) => {
          if (err) {
            // do something if error
            throw err;
          } else {
            console.log(`Post ${postId} deleted`);
            res.send(result);
          }
        });
      }
    });
  },
};

module.exports = PostsController;
