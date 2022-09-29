const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");

const PostsController = {
  Index: (req, res) => {
    // find all posts
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }

      // posts = [ post1, post2 ]
      // find all matching users
      posts.forEach((post, index) => {
        User.findById(post.userId).then((user) => {
          // 1. convert image into base 64 and save in post
          console.log(user);
          posts[index].image = user.image.data.toString("base64");

          // 2. save name in post
          posts[index].name = user.firstName;
        });
      });

      res.render("posts/index", { posts: posts });
    });
  },
  New: (req, res) => {
    res.render("posts/new", {});
  },

  Create: (req, res) => {
    const post = new Post({
      message: req.body.message,
      userId: req.session.user._id,
    });

    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
  View: (req, res) => {
    const postId = req.params.id;

    Post.findOne({ _id: postId }).then((post) => {
      if (!post) {
        res.redirect("/posts");
      } else {
        Comment.find({ postId: postId }).then((comments) => {
          res.render("posts/post", {
            post: post,
            comments: comments,
          });
        });
      }
    });
  },
  CreateComment: (req, res) => {
    // req.body = { newComment: 'comment from form' }
    if (req.body.newComment.trim().length === 0) {
      res.status(201).redirect(req.get("referer"));
      return "";
    }

    const comment = new Comment({
      message: req.body.newComment,
      postId: req.params.id,
    });

    comment.save((err) => {
      if (err) {
        throw err;
      }
    });

    res.status(201).redirect(req.get("referer"));
  },

  LikesCounter: (req, res, next) => {
    const action = req.body.action;
    const counter = action === "Like" ? 1 : -1;
    Post.updateOne(
      { _id: req.params.id },
      { $inc: { likes_count: counter } },
      {},
      (err, numberAffected) => {
        // res.send('');
      }
    );
    //});
    //  res.render("posts/", {});
    res.redirect("/posts");
  },
};

module.exports = PostsController;
