const Post = require("../models/post");
const User = require("../models/user");
const Like = require("../models/like");
const Comment = require("../models/comment");
const moment = require("moment");
const cloudinary = require("cloudinary").v2;

const PostsController = {
  Index: async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      let posts = await Post.find().exec();
      posts = posts.reverse();

      for (let post of posts) {
        post.likesCount = await Like.countDocuments({
          post: post._id,
          liked: true,
        }).exec();

        const user = await User.findById(post.user);
        post.username = user.username;
        post.currentUser = currentUser.username === post.username;
        post.formattedCreatedAt = moment(post.createdAt).format(
          "DD/MM/YYYY HH:mm"
        );

        const likes = await Like.find({
          post: post._id,
          liked: true,
        })
          .populate({
            path: "user",
            select: "username",
          })
          .exec();
        post.likedBy = likes.map((like) => like.user.username);

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
  Create: async (req, res) => {
    const { message } = req.body;

    let image = "";
    try {
      if (req.file) {
        console.log(req.file.path);
        const result = await cloudinary.uploader.upload(req.file.path);

        if (!result) {
          return res.status(500).send("An error occurred during upload.");
        }
        image = result.url;
      }
    } catch (error) {
      console.log("Error uploading the image.");
      return res.status(500).send("An error occurred: " + error.message);
    }

    const post = new Post({
      message,
      image,
      user: req.session.user,
    });

    try {
      await post.save();
      return res.status(201).redirect("/posts");
    } catch (error) {
      return res.status(400).render("posts/new", {
        error: "An error occurred while creating the post.",
      });
    }
  },
};

module.exports = PostsController;
