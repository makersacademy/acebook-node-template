const Post = require("../models/post");
const Comment = require("../models/comment");
const { post } = require("../app");
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
          posts[index].image = user.image.data.toString("base64");

          // 2. save name in post
          posts[index].name = user.name;
        });
      });

      console.log(posts);

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

    //console.log('below is req obj==============================================================');
    //console.log(req.session.user._id);

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
};

module.exports = PostsController;
