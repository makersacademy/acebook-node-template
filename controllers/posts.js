var Post = require('../models/post');

var PostsController = {
  Index: function(req, res) {
    var OrderedPost = Post.find().sort( { createdAt: -1 } )
    OrderedPost.find(function(err,posts) {
      if (err) { throw err; }
      console.log(req.session.user)
      res.render('posts/index', { posts: posts});
     });
    },
  
  Create: function(req, res) {
    const options = { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }
    console.log(req.file)
    function filename(req) {
      if (req.file == undefined) {
        return ''
      } else if (req.file != undefined) {
        return ('/images/' + req.file.filename)
      }
    }
    var post = new Post({
      message: req.body.message,
      picture: filename(req),
      posterID: req.session.user._id,
      posterName: req.session.user.firstname,
      datetime: new Date().toLocaleDateString("en-GB", options),
      posterPic: req.session.user.profilePicture,
      likes: 0,
    });
    post.save(function(err) {
      if (err) { throw err; }

      res.status(201).redirect('/posts');
    });
  },

  NewComment: function(req, res) {
    const options = { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }
    Post.findByIdAndUpdate(
      req.body.postid, 
      { $push: {
         comments: {
            comment: req.body.comment,
            user: req.session.user.firstname,
            datetime: new Date().toLocaleDateString("en-GB", options),
         }
        }
      }, 
      {new:true}, 
      function(err) {
        if (err) { throw err; }
      }
    )

    res.redirect('/posts');
  },

  CountLikes: function(req) {
    Post.findByIdAndUpdate(
      req.params.id,
       { $inc: { likes: 1 } },
      {new: true}, 
      function(err) {
        if (err) { throw err; }
      }
    )
    },
};

module.exports = PostsController;
