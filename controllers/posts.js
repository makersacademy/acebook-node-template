const Post = require("../models/post");
const Like = require("../models/like");
const Comment = require("../models/comment");

const PostsController = {
  Index: async (req, res) => {
    try {
      let posts = await Post.find().exec();
      posts = posts.reverse();

      for (let post of posts) {
        post.likesCount = await Like.countDocuments({
          post: post._id,
          liked: true,
        }).exec();

        const likes = await Like.find({
          post: post._id,
          liked: true,
        })
          .populate({
            path: "user",
            select: "email",
          })
          .exec();

        post.likedBy = likes.map((like) => like.user.email);

        post.comments = await Comment.find(
          { post: post._id },
          { _id: 0, content: 1, user: 1 }
        ).exec();
      }

      res.render("posts/index", { posts: posts });
    } catch (err) {
      throw err;
    }
  },
  New: (req, res) => {
    res.render("posts/new", {});
  },
  Create: (req, res) => {
    const post = new Post({
      message: req.body.message,
      user: req.session.user,
    });
    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
};

module.exports = PostsController;
