const Post = require("../models/post");
const User = require("../models/user");
const helpers = require('handlebars-helpers')();



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
    const post = new Post(req.body);
    const user = req.session.user;
 
    
    post.postAuthor =  {
      firstName: user.firstName,
      lastName: user.lastName
    }
      
    post.timestamp = new Date();

    post.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
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