const User = require("../models/user");
const Post = require("../models/post"); 

const UserPostsController = {
    Create: (req, res) => {
      const username = req.params.username; 
      const content = req.body.content; 
  
      User.findOneAndUpdate( { username }, { $push: { posts: { content } } }, { new: true },
        (err) => {
          if (err) {
            throw err;
          }
          res.status(201).redirect(`/users/${username}`); 
        }
      );
    },

    EditPost: (req, res) => {
      const postId = req.params.postId;
 // Fetch the post from the database based on the provided postId 
      Post.findOne({ _id: postId }, (err, post) => {
        if (err || !post) {
          res.status(404).send("Post not found");
        } else {
          res.render("posts/edit", { post });
        }
      });
    },

    UpdatePost: (req, res) => {
      const postId = req.params.postId;
      const newContent = req.body.content;
  
      Post.findByIdAndUpdate(
        postId,
        { message: newContent },
        { new: true },
        (err, updatedPost) => {
          if (err || !updatedPost) {
            res.status(404).send("Post not found");
          } else {
            res.redirect(`/users/${req.params.username}`);
          }
        }
      );
    }


  };
  
  module.exports = UserPostsController;



