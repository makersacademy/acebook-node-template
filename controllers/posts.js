const Post = require("../models/post");
const User = require("../models/user");
const Resize = require("../middleware/resize");
const fs = require("fs");
const path = require("path");

const PostsController = {
  Like: async (req, res) => {
    const postID = req.body.post;
    const userID = req.session.user._id;
    const post = await Post.findOne({ _id: postID });
    let liked = false;

    const userAlreadyLiked = post.likes.includes(userID);
    if (userAlreadyLiked) {
      const index = post.likes.indexOf(userID);
      post.likes.splice(index, 1);

      liked = true;
    } else {
      post.likes.push(userID);
      liked = false;
    }

    await post.save();
    res.send({ liked: liked, userID: userID });
  },

  Index: (req, res) => {
    const user = req.session.user;

    Post.find()
      .populate("user")
      .populate([
        {
          path: "comments",
          populate: {
            path: "postedBy",
          },
        },
      ])
      .exec((err, posts) => {
        if (err) {
          throw err;
        }

        posts.forEach((post) => {
          console.log(post.user);
          if (post.user.profilePic.data) {
            post.user.profilePic.data =
              post.user.profilePic.data.toString("base64");
            // return post.toObject();
          }

          if (post.likes.includes(user._id) == true) {
            post._doc.color = "#1877f2";
          } else {
            post._doc.color = "gray";
          }
        });

        // convert image data into base64
        convertImage(posts);

        User.findOne({ _id: user._id }).then((user) => {
          if (user.profilePic.data) {
            user.profilePic.data = user.profilePic.data.toString("base64");
          }

          res.render("posts/index", {
            posts: posts.reverse(),
            title: "Acebook",
            profilePic: user.profilePic,
            firstName: user.firstName,
            userID: user._id,
          });
        });
      });
  },

  Create: async (req, res) => {
    const message = req.body.message;

    if (message == "") {
      Post.find((err, posts) => {
        if (err) {
          throw err;
        }
        console.log("req", req.file);
        // convert image data into base64
        convertImage(posts);

        res.render("posts/index", {
          posts: posts.reverse(),
          title: "Acebook",
          blank: "Please enter a message",
          firstName: req.session.user.firstName,
        });
      });
    } else {
      const obj = {
        message: message,
        user: req.session.user._id,
      };

      if (req.file) {
        // save image
        const imagePath = path.join(__dirname, "../uploads");
        const fileUpload = new Resize(imagePath);
        const filename = await fileUpload.save(req.file);

        // load resized image
        const data = fs.readFileSync(path.join(imagePath, filename));

        obj.img = {
          data: data,
          contentType: req.file.mimetype,
        };
      }

      // create post
      Post.create(obj, (err, post) => {
        if (err) {
          throw err;
        } else {
          post.save((err) => {
            if (err) {
              throw err;
            }
            res.status(201).redirect("/posts");
          });
        }
      });
    }
  },
};

// from https://dpwdec.github.io/2020/06/17/store-images-in-mongodb
function convertImage(posts) {
  posts.forEach((post) => {
    if (post.img.data) {
      post.img.data = post.img.data.toString("base64");
      return post.toObject();
    }
  });
}

module.exports = PostsController;
