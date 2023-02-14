const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");

const PostsController = {
  Index: (req, res) => {
    Post.find((err) => {
      if (err) {
        throw err;
      }
    }).sort({date:-1}).then((post) => {
      let collection = [];
      async function post_set(post, i) {
        await User.findById(post[i].user_id, (err, user) => {
          if (err) {
            throw err;
          }
          let regex = /^\w*[^@]/g;
          let username = user.email.match(regex);
          let isPicture = post[i].picture !== "";
          collection.push({post: post[i], picture: user.picture, username: username, isPicture: isPicture});
        })
      }
      async function increment(post) {
        for(let i = 0; i < post.length; i++) {
        await post_set(post, i);
      }
      res.render("posts/index", { collection: collection , session_user: req.session.user});
      }
      increment(post);
    })
  },
  New: (req, res) => {
    res.render("posts/new", {session_user: req.session.user});
  },
  Create: (req, res) => {
    const post = new Post(req.body);
    post.date = Date.now();
    post.user_id = req.session.user._id;
    if (post.message === "" || post.message.length > 250) {
      res.status(201).redirect("/posts/new");
    } else if (post.message[0] === " ") {
      const trimmed_post = post.message.trim();
      if (trimmed_post.length != 0) {
        post.message = trimmed_post;
        post.save((err) => {
          if (err) {
            throw err;
          }

          res.status(201).redirect(`/posts/`);
        });
      } else {
        res.status(201).redirect(`/posts/new`);
      }
    } else {
      post.save((err) => {
        if (err) {
          throw err;
        }
  
        res.status(201).redirect("/posts");
      });
    }
  },
 
  Like: (req, res) => {
    const postId = req.params.id;
    const userId = req.session.user._id
  
    Post.findById(postId, (err, post) => {
      if (err) {
        throw err;
      }
  
      const alreadyLiked = post.liked_by.includes(userId);
  
      if (!alreadyLiked) {
        post.likes = post.likes + 1;
        post.liked_by.push(userId);
      } else {
        post.likes = post.likes - 1;
        post.liked_by = post.liked_by.filter(id => id !== userId);
      }
  
      post.save((err) => {
        if (err) {
          throw err;
        }
  
        res.redirect("/posts");
      });
    });
  },

  Details: (req, res) => {
    const postId = req.params.id;
    Post.findById(postId, (err, post) => {
      if (err) {
        throw err;
      }
      
      return post;
    }).then((post) => (
      Comment.find((err, comments) => {
        if (err) {
          throw err;
        }
        res.render("posts/details", {comments: comments, post: post, session_user: req.session.user});
      }).where({post_id: postId})
    ));
  },

  CreateComment: (req, res) => {
      const postId = req.params.id;
      const userId = req.session.user._id

      const comment = new Comment(req.body);
      comment.post_id = postId;
      comment.user_id = userId;

      if (comment.message === "" || comment.message.length > 250) { 
        res.status(201).redirect(`/posts/${postId}`); 
      } else if (comment.message[0] === " ") {
        const trimmed = comment.message.trim();
        if (trimmed.length != 0) {
          comment.message = trimmed;
          comment.save((err) => {
            if (err) {
              throw err;
            }
            
            res.status(201).redirect(`/posts/${postId}`);
          });
        } else {
          res.status(201).redirect(`/posts/${postId}`);
        }
      } else {
        comment.save((err) => {
          if (err) {
            throw err;
          }
          
          res.status(201).redirect(`/posts/${postId}`);
        });
      }
  }
};

module.exports = PostsController;
