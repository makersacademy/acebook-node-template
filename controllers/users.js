const User = require("../models/user");
const Post = require("../models/post"); 


const UsersController = {
  New: (req, res) => {
    // res.render("users/new", {});
    res.render("users/signup", {});

  },

  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
    });
  },
    UserProfile: (req, res) => {
    const username = req.params.username; 
  
    User.findOne({ username }, (err, user) => {
      if (err) {
        throw err;
      }
      res.render("users/profile", { user });
    });
  },

    CreatePost: (req, res) => {
      const username = req.params.username;
      const postContent = req.body.content;

      User.findOne({ username }, (err, user) => {
        if (err || !user) {
          res.status(404).send("User not found");
        } else {
          const post = {
            content: postContent,
            author: user._id,
          };
          user.posts.push(post);

          user.save((err) => {
            if (err) {
              throw err;
            }
            res.status(201).redirect(`/users/${username}`);
          });
        }
      });
  },

    Show: (req, res) => {
      const username = req.params.username;
      User.findOne({ username }, (err, user) => {
        if (err || !user) {
  
          res.status(404).send("User not found");
        } else {
  
          res.render("users/profile", { user });
        }
      });
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
  
};

  

module.exports = UsersController;
