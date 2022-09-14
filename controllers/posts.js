const Post = require("../models/post");
const Resize = require("../middleware/resize");
const fs = require('fs')
const path = require('path');

const PostsController = {
  Like: async (req, res) => {
    const postID = req.body.post;
    const userID = req.session.user._id;
    const post = await Post.findOne({ _id: postID });

    const userAlreadyLiked = post.likes.includes(userID);
    if (userAlreadyLiked) {
      const index = post.likes.indexOf(userID)
      post.likes.splice(index, 1)
    } else {
      post.likes.push(userID);
    }

    await post.save();
    res.status(201).redirect("/posts");
  },

  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }

      posts.forEach((post) => {
        if (post.img.data) {
          // from https://dpwdec.github.io/2020/06/17/store-images-in-mongodb
          // convert image data into base64
          post.img.data = post.img.data.toString('base64');
          return post.toObject();
        }
      })

      res.render("posts/index", {
        posts: posts.reverse(),
        title: "Acebook",
        firstName: req.session.user.firstName,
        userID: req.session.user._id
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

        posts.forEach((post) => {
          if (post.img.data) {
            post.img.data = post.img.data.toString('base64');
            return post.toObject();
          }
        })

        res.render("posts/index", {
          posts: posts.reverse(),
          title: "Acebook",
          blank: "Please enter a message",
          firstName: req.session.user["firstName"]
        });
      });

    } else {

      const obj = {
        message: message
      }

      if (req.file) {
        // save resized image to '/uploads'
        const imagePath = path.join(__dirname, '../uploads');
        const fileUpload = new Resize(imagePath);
        // const filename = await fileUpload.save(req.file.buffer);
        const filename = await fileUpload.save(req.file);

        // load resized image
        const data = fs.readFileSync(path.join(imagePath, filename));

        obj.img = {
          data: data,
          contentType: req.file.mimetype
        }
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
      })
    }
  },
};

module.exports = PostsController;
