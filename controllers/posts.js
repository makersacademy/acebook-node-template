const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    const currentUserId = req.session.user._id;
    const friends = [currentUserId, ...req.session.user.friends];

    Post.find({ user_id: { $in: friends } })
      .populate("user_id")
      .exec((err, posts) => {
        if (err) {
          // do something if there's an error
          console.log("PostsPage.index error with Post.find");
          console.log(err);
        } else {
          //   posts = posts.map((post) => {
          // //   return { post: post, isUser: true };
          // // });
          // posts.map(post => {
          //   {
          //     post: post,
          //   isUser = true // logic to see if the post user id = current user id
          // }
          // })
          // this.post.message
          // this.post.time
          // {{if isUser}}
          res.render("posts/index", {
            posts: posts.reverse(),
            currentUserId: currentUserId,
          });
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
    console.log("delete request made");
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
