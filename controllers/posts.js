const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }

      res.render("posts/index", { posts: posts.reverse() });
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
  //this function increases the value of the likes in the database by one
  Like: (req, res) => {
    Post.findOne({message: req.body.message }, (err, doc) => {

      if (err) {
        throw err;
      }
      //doc is a row in the database
      doc.likes += 1;
      doc.save((err) => {
    
        if (err) {
          throw err;
        }
  
        res.status(201).redirect("/posts");
      });
    });
  },  
  Unlike: (req, res) => {
  Post.findOne({message: req.body.message }, (err, doc) => {

    if (err) {
      throw err;
    }
    //doc is a row in the database
    doc.likes -= 1;
    doc.save((err) => {
  
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
  });
});
}};

module.exports = PostsController;
