const { post } = require("../app");
const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find().populate({path: "user", select: "email"}).exec((err, posts) => {
      if (err) {
        throw err;
      }
      res.render("posts/index", { posts: posts });
    });
  },
  New: (req, res) => {
    res.render("posts/new", {});
  },
  Create: (req, res) => {
    const postInfo = req.body;
    postInfo.user = req.session.user._id;
    const post = new Post(postInfo);
    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  }, 
  
  Delete: (req, res) => {
    console.log(req.params)
    posts.remove({id: req.params.id}) 
      
    res.status(201).redirect("/posts");
    console.log(dc);
    console.log('testing delete')
  }
}  
       

module.exports = PostsController;
