const Post = require("../models/post");
const User = require("../models/user")

const PostsController = {
  Index: async (req, res) => {
    Post.find((err, posts)=> {
      if (err) {
        throw err;
      }
      res.render("posts/index", { posts: posts.reverse(), username: posts.username});
    });
  },
  New: (req, res) => {
    res.render("posts/new");
  },
  Create: (req, res) => {
    const post = new Post({message: req.body.message, username: req.session.user.username})
    post.save((err) => {
      if (err) {
        throw err;
      }
      console.log(req.params)
      
      res.status(201).redirect("/posts");
    });
  },
  Comments: (req, res) => {
    Post.find((err, posts) => {
      if(err) {
        throw err;
      }
      res.render("posts/comments", {comments: posts });
    })
  }
  // they get to the posts/comments route (above)
  // then they would go to the post route (after they click submit) which redirects them to the Index page. 
  // Posts route would save the comments to the req.body (or however you do it)

};

module.exports = PostsController;
