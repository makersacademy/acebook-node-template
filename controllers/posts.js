const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find()
    .sort({'date': -1})
    .limit(10)
    .exec((err, posts) => {
      if (err) {
        throw err;
      }
      res.render("posts/index", { posts: posts, newUser: false });
    });
  },
  New: (req, res) => {
    res.render("posts/new", { newUser: false });
  },
  Update: (req, res) => {
    Post.findOneAndUpdate(
      {_id: req.body.id},
      {$push:
        {comments: req.body.comments}
      },
      (err, result)=>{
      console.log(err);
      console.log(result);
      res.status(201).redirect("/posts");
    });
  },  

  Like: (req, res) => {
    Post.findOne({_id: req.body.id},
      (err, result)=>{
        console.log(err);
        console.log(result.likes)
        console.log(req.session.userID)
        if(result.likes.includes(req.session.userID)) {
          Post.findOneAndUpdate(
            {_id: req.body.id},
            {$pull:
              {likes: req.session.userID}
            },
            (err, result)=>{
              console.log(err);
              console.log(result);
            });
            } else {
              Post.findOneAndUpdate(
                {_id: req.body.id},
                {$push:
                  {likes: req.session.userID}
                },
                (err, result)=>{
                  console.log(err);
                  console.log(result);
                  
              }
            )}  
            res.status(201).redirect("/posts");
          })
        
  },

  Create: (req, res) => {
    console.log(req.body)
    console.log(req.session.userID)
    const post = new Post({ 
      message: req.body.message,
      userID: req.session.userID,
      userName: req.session.userName
    });
    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
  Delete: (req, res) => {
    Post.findOneAndDelete(
      {_id: req.body.id},
      (err, result)=>{
      console.log(req)
      console.log(err);
      console.log(result);
      res.status(201).redirect("/posts");
    });  
  },
};

module.exports = PostsController;
