const Post = require("../models/post");
const fs = require("fs");
const path = require('path')
const PostsController = {
  Index: (req, res) => {

    Post.find({}, 'message image createdAt likesList', {sort: {'createdAt': -1}},(err, posts) => {
        if (err) {
          throw err;
        }
        res.render("posts/index", { posts: posts });
        }).populate('user').populate('userLikes').populate({path: "comments", populate: {path: 'user likes'}});
        
      },


  New: (req, res) => {
    res.render("posts/new", {});
  },

  Create: (req, res) => {
    const post = new Post({user: req.session.user._id, message: req.body.message});
    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },

  CreateImage: (req, res) => {
    const post = new Post({user: req.session.user._id, image: req.body.img_name, message: req.body.message});
    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },

  Like: (req, res) => {
    Post.findOne({_id: req.body.post_id}).exec().then((post) => {
      post.userLikes.push(req.session.user._id)
      post.save()
    }).then(() => {
      res.status(201).redirect("/posts");
    })

  },

  Unlike: (req, res) => {

    Post.findOne({_id: req.body.post_id}).exec().then((post) => {
      post.userLikes.pull(req.session.user._id)
      post.save()
    }).then(() => {
      res.status(201).redirect("/posts");
    })
  },

 Images: (req, res) => {
  let pictures = [] 
  const dirname = path.join(__dirname, '../public/postImages')
  fs.readdir(dirname, function(err, images) {
    if (err) {
      throw err;
    }
    images.forEach(file => {
      pictures.push(`/postImages/${file}`)
    });
    res.render("posts/images", {pictures: pictures})
  });
}
};
/* 
   like said image
   then add a comment to the image */
module.exports = PostsController;
