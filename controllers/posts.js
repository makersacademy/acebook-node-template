const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
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
    const post = new Post(req.body);
    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
  Delete: ("/posts/:id", function(req, res) {

    Post.remove({_id: req.params.id}, (err, result) => {
      if (err) return console.log(err)
      console.log(req.body)
      res.redirect('/')
    })
  })
};

module.exports = PostsController;



// Delete: ("/posts/:id", function(req, res, next) {
  
  //   // Post.findByIdAndDelete(req.params.id)

  //   Post.deleteOne({message: 'hi'})

  //   console.log("Helloooo!")
  //   .then(() => {

  //     res.redirect('/posts');
  //     })
  //  .catch(err => {
  //     const error = new Error(err);
  //     error.httpStatusCode = 500;
  //     return next(error);
  // })
  // console.log(req.params.id);
  // })


  // Delete: (req, res) => {
   
  //   // let query = {message: 'hi'};

  //   // Post.deleteOne(query);
  //   const post = Post.findOne({message: "hi"});

  //   Post.remove(post);
  //   console.log('Hello');

  //   // Post.remove(query, function(err){
 
  //   //   if(err){
  //   //     console.log(err);
  //   //   }
  //   //   console.log("Helloooo!")
  //   //   res.send('Success');
  //   //   });
  //   }