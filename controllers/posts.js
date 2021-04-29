var Post = require('../models/post');
require('../routes/posts');
var alert = require('alert');
var Comment = require('../models/comment');
var User = require('../models/user');
var Image = require('../models/image');
var fs = require('fs');

var PostsController = {
  Index: function(req, res) {
    var currentUser = req.user;
    Post.find(function(err, posts) {
      if (err) { throw err; }

      res.render('posts/index', { posts: posts, currentUser });
    }).populate('images').populate({path:'comments', populate: {path: 'author'}}).populate('author').sort({createdAt: -1})

  },

  ViewImage: function(req, res) {
    Image.find(function(err, images) {
      if (err) { throw err; }
      res.render('posts/image', { images: images })
    })
  },

  UploadImages: function(req, res) {
    const files = req.files;
    if(req.user) {

   
      if(files.length === 0 ) {
        alert('You dizzy?!! Choose a pic to upload!!!')
        return res.status(401).redirect('/posts')
      }
      var imgArray = files.map((file) => {
        var img = fs.readFileSync(file.path)

        return encode_image = img.toString('base64')
      })

      imgArray.map((src, index) => {

      
        var finalImg = {
            filename : files[index].originalname,
            contentType : files[index].mimetype,
            imageBase64 : src
        }
        Post.findById(req.params.id, (err, post) => {
          if(req.user._id == post.author) {

          
          newImage = new Image (finalImg);
          newImage.save((saveImageError) => {
            if(saveImageError) { throw saveImageError; }
              post.images.push(newImage);

              post.save((savePostError) => {
                if(savePostError) { throw savePostError; }
                
                res.status(201).redirect('/posts')
              })
          })
          }else {
            alert('Fam! You cant be uploading your ugly pics here! go to your posts!')
            return res.status(401).redirect('/posts')
          }
        })
      });
    } else {
      alert('Fam! Log in first!')
      return res.status(401).redirect('/posts')
    }
  },

  New: function(req, res) {
    var currentUser = req.user;
    res.render('posts/new', {currentUser});
  },
  Create: function(req, res) {
    if (req.user) {
      User.findById(req.user._id, (err, user) => {
        var post = new Post(req.body);
        post.author = req.user._id;
        post.save((savePostError) => {
          if(savePostError) { throw savePostError; }

          user.posts.push(post)
          user.save();
          res.status(201).redirect('/posts');
        })
      })
    } else {
      alert('Fam! Log in first!')
      return res.status(401).redirect('/posts')
    }
  },
  Delete: function(req, res) {
      Post.findById(req.params.id, (err, post) => {
        if(req.user._id == post.author) {
          post.deleteOne( function(err) {
            if (err) { throw err;}

            res.status(201).redirect('/posts');
        });
        }else {
          alert('Bruh! You cant be deleting ppls posts like that')
          return res.status(401).redirect('/posts')
        }
          
      })
      
  },

  Edit: function(req, res) {
    Post.findById(req.params.id, (err, post) => {
      if(req.user._id == post.author) {
        var id = req.params.id;
        var edit = req.body.edited;
        Post.updateOne({_id: id},{message: edit}, (err) => {

          if(err){
            return res.status(401).redirect('/posts');
          }
          else {
            return res.status(200).redirect('/posts')
          }
        
      })
      } else {
        alert('Bruh! You cant be editing ppls posts like that')
        return res.status(401).redirect('/posts')
      }
      
    }) 
  },
  
  Comment: function(req, res) {
    if(req.user) {
      Post.findById(req.params.id, (err, post) => {
      var comment = new Comment(req.body);
      comment.author = req.user._id;
      comment.save((saveCommentError) => {
        if (saveCommentError) { throw saveCommentError; }

        // Push the comment to the post
        post.comments.unshift(comment);

        post.save((savePostError) => {
          if (savePostError) { throw savePostError; }

          res.status(201).redirect('/posts'); 
        })     
      });
    })
    }else {
      alert('Fam! Log in first!')
      return res.status(401).redirect('/posts')
    }
    

  },

  EditComment: function(req, res) {
    Comment.findById(req.params.id, (err, comment) => {
      if(req.user._id == comment.author) {
        var id = req.params.id;
        var edit = req.body.edited;
        Comment.updateOne({_id: id},{comment: edit}, (err) => {

          if(err){
            return res.status(401).redirect('/posts');
          }
          else {
            return res.status(200).redirect('/posts')
          }
        
      })
      } else {
        alert('Bruh! You cant be editing ppls comment like that')
        return res.status(401).redirect('/posts')
      }
      
    }) 
  },

  DeleteComment: function(req, res) {
    Comment.findById(req.params.id, (err, comment) => {
      if(req.user._id == comment.author) {
        comment.deleteOne( function(err) {
          if (err) { throw err;}

          res.status(201).redirect('/posts');
      });
      }else {
        alert('Bruh! You cant be deleting ppls comments like that!')
        return res.status(401).redirect('/posts')
      }
        
    })
  },

  Like: function(req, res) {
    if(req.user) {
      Post.findByIdAndUpdate({_id: req.params.id},{$inc:{likes: 1}}, (err, post) => {
      //like.author = req.user._id;
        post.save((savePostError) => {
          if (savePostError) { throw savePostError; }

          res.status(201).redirect('/posts'); 
        })
      })     
    } else {
     alert('Fam! Log in first!')
     return res.status(401).redirect('/posts')
    }
  },

  Dashboard: function(req, res) {
      var currentUser = req.user;
      var currentUserId = currentUser._id
      Post.find({author: currentUserId}, function(err, posts) {
        if (err) { throw err; }
  
        res.render('posts/dashboard', { posts: posts, currentUser });
      }).populate({path:'comments', populate: {path: 'author'}}).populate('author').sort({createdAt: -1})
    }
    
  };

module.exports = PostsController;