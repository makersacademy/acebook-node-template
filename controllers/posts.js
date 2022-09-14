const Image = require("../models/image")
const Post = require("../models/post");
const Resize = require("../middleware/resize");
const fs = require('fs')
const path = require('path');
// require('dotenv/config')

const PostsController = {
  Upload: async (req, res) => {
    const imagePath = path.join(__dirname, '../uploads');
    const fileUpload = new Resize(imagePath);
    if (!req.file) {
      res.status(401).json({ error: 'Please provide an image' });
    }

    // saves a resized image to '/uploads'
    const filename = await fileUpload.save(req.file.buffer);

    //new stuff to save to db
    // need to make this obj more sophisticated
    const obj = {
      name: 'my pic',
      desc: 'a test pic',
      img: {
        data: req.file.buffer,
        contentType: 'image/png'
      }
    }

    Image.create(obj, (err, item) => {
      if (err) {
        console.log(err);
      } else {
        item.save((err) => {
          if (err) {
            throw err;
          }
        })
      }
    })

    // will do something better than this
    return res.status(200).json({ name: filename });

  },

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

      // posts.forEach((post) => {
      //   if (post.img.data) {
      //     post.img.data = post.img.data.toString('base64');
      //     return post.toObject();
      //   }
      // })

      // posts = posts.map((post) => {
      // post.img.data = post.img.data.toString('base64');
      // return post.toObject();
      // })

      posts.forEach((post) => {
        console.log(post)
      })

      res.render("posts/index", {
        posts: posts.reverse(),
        title: "Acebook",
        firstName: req.session.user.firstName,
        userID: req.session.user._id
      });
    });
  },

  Create: (req, res) => {
    const message = req.body.message;
    const obj = {
      message: message
    }

    // if image is uploaded
    if (req.file) {
      const data = fs.readFileSync(path.join(__dirname + '/../uploads/' + req.file.filename));
      obj.img = {
        data: data,
        contentType: 'image/png'
      }
    }

    if (message == "") {
      Post.find((err, posts) => {
        if (err) {
          throw err;
        }
        res.render("posts/index", {
          posts: posts.reverse(),
          title: "Acebook",
          blank: "Please enter a message",
          firstName: req.session.user["firstName"]
        });
      });
    } else {
      Post.create(obj, (err, post) => {
        if (err) {
          console.log(err);
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
