//const Comment = require("../models/comments");
const Post = require("../models/post");

const CommentsController = {
      CreateComment: (req, res) => {
        const { message } = req.body; // Extract the comment data from the request body
        const user = req.session.user;
        const postId = req.params.postId;

    if (!message) {
      const error = "Please enter a comment."; // Set the error message
      return Post.findById(postId)
        .then((post) => {
          res.render("posts/show", { post, error }); // Render the same post page with the error message
        })
        .catch((err) => {
          console.log(err);
          res.render("error"); // Render an error page or handle the error in an appropriate way
        });
    }
        
        Post.findById(req.params.postId)
        .then((post) => {
          post.comments = post.comments || [];
          // Create a new comment object
          const author = `${user.firstName} ${user.lastName}`
          console.log(author)
          const newComment = { message, author };
          post.commentTime = new Date();
          
          // post.comments.author = user.firstName + user.lastName
          
          // Add the new comment to the comments array of the post
          post.comments.unshift(newComment);
          
          return post.save(); // Save the updated post with the new comment
        })
        .then(() => res.redirect(`/posts/${req.params.postId}`))
        .catch((err) => {
          console.log(err);
        });
      }
      
    };
  
  
  module.exports = CommentsController;
  
  
