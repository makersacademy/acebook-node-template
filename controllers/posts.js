const Post = require("../models/post");

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
    .findById(req.params.id).lean().populate('comments')
    .then((post) => res.render('posts/show', { post }))
    .catch((err) => {
      console.log(err.message);
  });
  }
};

module.exports = PostsController;



  
  // CreateComment: (req, res) => {
  //   const { comment } = req.body; 
  
  //   const newComment = {
  //     content: comment,
  //     createdAt: new Date()
  //   };
  
  //   const post = new Post();
  //   post.comment.push(newComment);
  
  //   post.save((err) => {
  //     if (err) {
  //       throw err;
  //     }
  //     res.status(201).redirect("/posts");
  //   });
  // }