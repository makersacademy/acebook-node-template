const Post = require("../models/post");
const Comment = require("../models/comment");
//const { post } = require("../app");
const User = require("../models/user");
const fs = require("fs");
const path = require("path");
const timeFcn = require("../public/javascripts/timeAgo");


const PostsController = {
  Index: async (req, res) => {
    var userImage = 'Image';
    var userName = 'Name';
    // find all posts
    if (req.session.user){
    await User.findById(req.session.user._id).then((user) => {
      userImage = user.image.data.toString("base64");
      userName =user.firstName; 
    
   }); 
  }
    await Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      posts = posts.reverse();
      posts.forEach((post, index) => {
        User.findById(post.userId).then((user) => {
          // 1. convert image into base 64 and save in post
          //console.log(user);
          if (user.image){
          posts[index].image = user.image.data.toString("base64");
        }
          // 2. save name in post
          posts[index].name = user.firstName;
        });
        if (post.postImage.data) {
        posts[index].newImage = post.postImage.data.toString("base64");
        posts[index].newTime = timeFcn(post.date);
        //console.log(posts[index].newTime); 
        //console.log(posts[index].postImage.data); 
        }
      });
      //console.log(userImage);
      res.render("posts/index", { posts: posts, userImage: userImage, userName: userName});
    });
  },
  New: (req, res) => {
    res.render("posts/temp", {});
  },

 

  CreateImgPst: (req, res) => {
    if (!req.file){
      req.file= 'undefined';
    }
    console.log(req.file);
    const post = new Post({
      message: req.body.message,
      userId: req.session.user._id,
      postImage: {
        data: fs.readFileSync(
          path.join("./public/images/" + req.file.filename)
        ),
        contentType: "image/png",
      },
    });

    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },


  Create: (req, res) => {
    const post = new Post({
      message: req.body.message,
      userId: req.session.user._id,
    });

    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },

  View: async (req, res) => {
    const postId = req.params.id;
    console.log(postId);
    // find the relevant post
    const post = await Post.findById(postId).exec();
    console.log(post);
    if (post.postImage){
   post.image = post.postImage.data.toString("base64");
    console.log('-------->', post);
    }
    /// find the postUser
    const postUser = await User.findById(post.userId).exec();
    const postUserImage = postUser.image.data.toString('base64');
  
    // find the relevant comments
    let comments = await Comment.find(
      { postId: postId }
    ).exec();
    comments = comments.reverse()
    console.log('before', comments);
    comments.forEach((comment, i) => {
      comments[i].time = timeFcn(comment.date);
    });
    console.log('after', comments);
  
    // find the matching comment users
    const users = await Promise.all(comments.map(async (comment) => {
      const foundUser = await User.findById(comment.userId).exec();
      return foundUser;
    }));
    console.log('users', users);
    users.forEach((user, i) => {
      comments[i].user = {
      firstName: user.firstName, image: user.image.data.toString('base64')
      };
    });
  
    res.render("posts/post", {
      post: post,
      postUser: postUser,
      postUserImage: postUserImage,
      comments: comments,
    });  
  },
  CreateComment: (req, res) => {
    // req.body = { newComment: 'comment from form' }
    if (req.body.newComment.trim().length === 0) {
      res.status(201).redirect(req.get("referer"));
      return "";
    }

    const comment = new Comment({
      message: req.body.newComment,
      postId: req.params.id,
      userId: req.session.user._id
    });

    comment.save((err) => {
      if (err) {
        throw err;
      }
    });

    res.status(201).redirect(req.get("referer"));
  },

  LikesCounter: (req, res, next) => {
    const action = req.body.action;
    const counter = action === "Like" ? 1 : -1;
    Post.updateOne(
      { _id: req.params.id },
      { $inc: { likes_count: counter } },
      {},
      (err, numberAffected) => {
        // res.send('');
      }
    );
    //});
    //  res.render("posts/", {});
    res.redirect("/posts");
  },
};

module.exports = PostsController;
