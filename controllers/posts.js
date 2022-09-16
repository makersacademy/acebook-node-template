const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    const currentUserId = req.session.user._id;

    Post.find({
      user_id: { $in: [currentUserId, ...req.session.user.friends] },
    })
      .populate("user_id")
      .exec((err, posts) => {
        if (err) {
          // do something if there's an error
          console.log("PostsPage.index error with Post.find");
          console.log(err);
        } else {
          console.log("loading posts");
          console.log(posts.comments_counter);
          // give each post a key giving true if the post was created by the current user
          posts.forEach((post) => {
            post._doc.belongsToCurrentUser =
              post.user_id._id.toString() === currentUserId;
            post._doc.likedByCurrentUser = post.likes.includes(currentUserId);
          });
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
    console.log("delete post request made");
    Post.findOne({ _id: postId }, (err, post) => {
      if (err) {
        // do something if error
        throw err;
      } else if (!post) {
        // do something if post doesn't exist
      } else if (post.user_id.toString() !== req.session.user._id) {
        // do something if right post but wrong user
        res.send("User IDs do not match");
      } else {
        console.log("this is supposed to be deleting");
        // do something if post exists and right user
        Post.deleteOne({ _id: postId }, (err, result) => {
          if (err) {
            // do something if error
            throw err;
          } else {
            console.log(`Post ${postId} deleted`);
            res.send(JSON.stringify(result));
          }
        });
      }
    });
  },
};

module.exports = PostsController;
