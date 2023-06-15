const Post = require("../models/post");
//const Comment = require("./comments");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
  
      // Reverse the order of posts array
      const reversedPosts = posts.reverse();
  
      res.render("posts/index", { posts: reversedPosts });
    });
  },
  New: (req, res) => {
    res.render("posts/new", {});
  },
  Create: (req, res) => {
    const post = new Post(req.body);
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
    
  
    // Find the post by ID in the database
    Post.findById(postId)
      .then((post) => {
        // Add the like to the post
        if (post.likes.some((like) => like === req.session.user._id)) {
          return res.status(400).json({ error: "User has already liked the post." });
      }
      post.likes.push(req.session.user._id);

      // Add the user to the likes array
      // Save the updated post
      return post.save();
      })
      .then((updatedPost) => {
      const likesCount = updatedPost.likes && Array.isArray(updatedPost.likes)
        ? updatedPost.likes.length
        : 0;

      res.json({ likesCount });

    })
      .catch(() => {
        // console.log(err);
        // res.status(500).json({ error: "An error occurred while processing your request." });
      });
  },

};



module.exports = PostsController;
