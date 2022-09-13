const Post = require("../models/post");

const PostsController = {
  Like: async (req, res) => {
    const postID = req.body.post;
    const userID = req.session.user._id;
    const post = await Post.findOne({ _id: postID });
    let liked = false;

    const userAlreadyLiked = post.likes.includes(userID);
    if (userAlreadyLiked) {
      const index = post.likes.indexOf(userID)
      post.likes.splice(index, 1)

      liked = true
      
    } else {
      post.likes.push(userID);
      liked = false
    }

    await post.save();
    res.send({liked: liked, userID: userID})
  },

  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      res.render("posts/index", {
        posts: posts.reverse(),
        title: "Acebook",
        firstName: req.session.user.firstName,
        userID: req.session.user._id
      });
    });
  },

  Create: (req, res) => {
    const post = new Post(req.body);
    if (post.message == "") {
      Post.find((err, posts) => {
        if (err) {
          throw err;
        }
        res.render("posts/index", {
          usersLikedPosts: 0,
          posts: posts.reverse(),
          title: "Acebook",
          blank: "Please enter a message",
          firstName: req.session.user["firstName"]
        });
      });
    } else {
      post.save((err) => {
        if (err) {
          throw err;
        }
        res.status(201).redirect("/posts");
      });
    }
  },
};

module.exports = PostsController;
