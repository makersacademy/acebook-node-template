const User = require("../models/user");
const Post = require("../models/post");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", { title: "Sign up to Acebook", layout: "signup" });
  },

  Create: (req, res) => {
    const user = new User(req.body);
    const email = user.email;
    console.log(email);
    user.save((err) => {
      if (err) {
        // let display = "invalid email";
        // res.render("users/new", { message: display });
        throw err;
      }
      res.status(201).redirect("/sessions/new");
    });
  },

  Profile: (req, res) => {
    let session = req.session.user;
    console.log(session._id)
    Post.find({"user": session._id}, (err, posts) => {
      if (err) {
        throw err;
      }

      res.render("users/index", {
        posts: posts.reverse(),
        user: session,
      })
    })
      .populate("user")
      .populate("remarks")
      .populate({ 'path': 'remarks', 'populate': { 'path': 'user'}});


  },
};

module.exports = UsersController;
