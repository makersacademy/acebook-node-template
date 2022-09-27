const Post = require("../models/post");
const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    // console.log(req.body.errorMessage)
    const errors = req.session.errors;
    req.session.errors = [];
    res.render("users/new", {signedIn: req.session.signedIn, errors: errors});
  },

  Create: async (req, res) => {
    const user = new User(req.body);
    try {
      await user.save();
      res.status(201).redirect("/posts")
    } catch (err) {
      req.session.errors = []
      for (const [errorType, errorMessage] of Object.entries(err.errors)) {
        req.session.errors.push(errorType.toUpperCase() + " ERROR: " + errorMessage + ".")
      }
      res.redirect("users/new");


      }
    },

  ViewProfile: async (req, res) => {
    var userId = req.params.userId;
    var user = await User.findById(userId)
    var posts = await Post.find({user: {_id: userId}})
    res.render("users/profile", {signedIn: req.session.signedIn, posts: posts, user: user});

  }




  };

module.exports = UsersController;
