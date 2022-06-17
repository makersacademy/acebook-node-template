const Post = require("../models/post");
const User = require("../models/user");

const PostsController = {
  Index: (req, res) => {
    Post.find()
    .sort({'date': -1})
    .limit(10)
    .exec((err, posts) => {
      if (err) {
        throw err;
      }

      Promise.all(posts.map(async (post) => {
        const user = await User.findOne({ userName: post.userName }).exec();
        const photo = {
          contentType: user.photo.contentType,
          data: user.photo.data.toString('base64'),
        };

        post.photo = photo;

        return post;
        
      })).then((postsWithPhotos) => {
        res.render("posts/index", { posts: postsWithPhotos, newUser: false });
      });
    });
  },
  Update: (req, res) => {
    User.findOne({ userName: req.session.userName}).then( (commenter) => {
      const photo = { 
        contentType: commenter.photo.contentType,
        data: commenter.photo.data.toString('base64')
      }
    Post.findOneAndUpdate(
      {_id: req.body.id},
      {$push:
        {comments: {userName: req.session.userName, comments: req.body.comments, photo: photo }}
        
      },
      (err, result)=>{
      console.log(err);
      console.log(result);
      res.status(201).redirect("/posts");
    });
  })},  

  Like: (req, res) => {
    Post.findOne({_id: req.body.id},
      (err, result)=>{
        if(result.likes.includes(req.session.userID)) {
          Post.findOneAndUpdate(
            {_id: req.body.id},
            {$pull:
              {likes: req.session.userID}
            }, {
              new: true // <- setting the new option to true to return the document after update was applied
            },
            (err, result)=>{
              console.log(err);
              console.log(result);
              res.send(result);
            });
            } else {
              Post.findOneAndUpdate(
                {_id: req.body.id},
                {$push:
                  {likes: req.session.userID}
                }, {
                  new: true
                },
                (err, result)=>{
                  console.log(err);
                  console.log(result);
                  res.send(result);
              }
            )} 
          })
        
  },

  Create: (req, res) => {
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
      console.log(err);
      console.log(result);
      res.status(201).redirect("/posts");
    });  
  },
};

module.exports = PostsController;
