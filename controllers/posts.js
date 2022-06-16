const Like = require("../models/like");
const Post = require("../models/post");
const Format = require("../Format");
const receiveImage = require("../uploadiddleware");
const { uploadImage } = require("../utilities/cloudinaryUtil");

const PostsController = {
  Index: (req, res) => {
    Post.find()
      .populate("user_id")
      .populate("likes")
      .populate({
        path: "comments",
        populate: {
          path: "user_id",
        },
      })
      .exec((err, posts) => {
        if (err) {
          throw err;
        }
        const reversedPosts = posts.reverse();

        reversedPosts.forEach((post) => {
          post.liked = post.likes.likes_array.includes(req.session.user._id);
        });

        res.render("posts/index", {
          session: req.session.user,
          posts: reversedPosts,
          error: req.flash("error"),
        });
      });
  },

  New: (req, res) => {
    res.render("posts/new", {});
  },

  Create: (req, res) => {
    const like = new Like();

    like.save((err) => {
      if (err) {
        throw err;
      }
    });

    const post = new Post({
      likes: like._id,
      user_id: req.session.user._id,
    });

    receiveImage(req, res, async (err) => {
      if (!req.body.message && !req.file) {
        req.flash("error", "Post cannot be blank");
        res.redirect("/posts");
      } else {
        if (req.file) {
          // handling errors from multer
          if (err) {
            return res.status(401).json({ error: err.message });
          }

          try {
            // format the image with sharp (i.e. Format class)
            const file = new Format();
            const fileToUpload = await file.format(req.file.buffer);

            if (!fileToUpload) {
              return res
                .status(401)
                .json({ error: "Image could not be formatted" });
            }
            // upload to cloudinary
            const imageStream = fileToUpload.formattedFile;
            const imageName = fileToUpload.fileName;

            const uploadResult = await uploadImage(imageStream, imageName);
            const uploadUrl = uploadResult.url;
            post.post_picture = uploadUrl;
          } catch (error) {
            return res.json({ error: "Failed to upload" });
          }
        }
        post.message = req.body.message;

        post.save((err) => {
          if (err) {
            throw err;
          }

          res.status(201).redirect("/posts");
        });
      }
    });
  },
};

module.exports = PostsController;
