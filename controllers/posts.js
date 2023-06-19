const Post = require("../models/post");
const User = require("../models/user");
const helpers = require('handlebars-helpers')();
const fs = require('fs');

const multer = require('multer');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image');


const PostsController = {
  Index: (req, res) => {
    const postId = req.params.postId;
    const userId = req.session.user._id;

    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
  
      // Reverse the order of posts array
      const reversedPosts = posts.reverse();
      const timeSince = helpers.timeSince;
  
      res.render("posts/index", { posts: reversedPosts, timeSince: timeSince });
    });
  },



  New: (req, res) => {
    res.render("posts/new", {});
  },



  Create: (req, res) => {

    // const post = new Post(req.body);
    const user = req.session.user;
    
    const post = new Post({

      content: req.body.message,
      image: {
    data: req.file ? fs.readFileSync('uploads/' + req.file.filename, 'base64') : null, // Read and encode the file as base64
    contentType: req.file ? req.file.mimetype : null, // Store the file mimetype in the database
      },
    });
    console.log('Post:', post);
  console.log('Post image data:', post.image.data ? post.image.data.toString('base64') : null);

    post.postAuthor =  {
      firstName: user.firstName,
      lastName: user.lastName
    }
      
    post.timestamp = new Date();
    const imageData = post.image.data ? post.image.data.toString('base64') : null;
  
    post.save((err) => {
      if (err) {
        throw err;
      }
      console.log('Post saved:', post);

      res.status(201).redirect("/posts");
    });
    
  },

  getImage: (req, res) => {
    Post.findById(req.params.postId, (err, post) => {
      if (err || !post || !post.image.data) {
        return res.status(404).send("Image not found");
      }
      res.set("Content-Type", post.image.contentType);

      res.send(Buffer.from(post.image.data, "base64"));

      console.log('Sending image data:', post.image.data);

    });
  },

Show: (req, res) => {
    Post
    .findById(req.params.postId).populate('comments')
    .then((post) => res.render('posts/show', { post }))
    .catch((err) => {
      console.log(err.message);
    });
  },


  likePost: (req, res) => {
    const postId = req.params.postId;
    const userId = req.session.user._id 
  
    // Find the post by ID in the database
    Post.findById(postId)
    .updateOne(
      { _id: postId },
      { $addToSet: { likes: userId } } )
      .then(() => {
        return Post.findById(postId); 
      })
      .then((updatedPost) => {
      const likesCount = updatedPost.likes && Array.isArray(updatedPost.likes)
        ? updatedPost.likes.length
        : 0;

      res.json({ likesCount });
    })
  },
};

module.exports = PostsController;
