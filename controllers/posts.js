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
    //const userId = req.user.id; // Assuming you have user authentication and can access the user ID
    //const likesCount = post.likes.length;

    // Find the post by ID in the database
    Post.findById(postId)
      .then((post) => {
        const a = 'a'//need to get rid of this and add the userid
        // Check if the user has already liked the post
        if (post.likes.includes(a)) {
          return res.status(400).json({ error: "User has already liked the post." });
        }else{

        // Add the user ID to the likes array
        post.likes.push(a);
        //post.likesCount += 1;
        }

        // Save the updated post
        return post.save();
      })
      .then((updatedPost) => {
        res.json({ likesCount: updatedPost.likes.length });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "An error occurred while processing your request." });
      });
  },
};



//   Likes: (req, res) => {
//     Post.findByIdAndUpdate(req.params.postId, { $inc: { likesCount: 1 } }, { new: true })
//   .populate('likes')
//   .then((post) => {
//     res.render('posts/show', { post });
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
    
//   }
  
// };

module.exports = PostsController;
