const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      posts = posts.sort((a,b) => b.date-a.date ) //sorts the posts by date order before rendering
      res.render("posts/index", { posts: posts, shownavbar:true});

    }); 
  },

  New: (req, res) => {
    res.render("posts/new", {shownavbar:true});
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
};



module.exports = PostsController;
