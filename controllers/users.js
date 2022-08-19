const User = require("../models/user");
const Post = require("../models/post");
const UsersController = {
  Index: (req, res) => {
    Post.find()
      .populate("user")
      .exec((err, posts) => {
        if (err) {
          throw err;
        }
        const user = req.session.user;
        console.log(user);
        console.log(posts);
        res.render("users/profile", {
          posts: posts.reverse(),
          user: user,
        });
      });
  },
  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: (req, res) => {
    const user = new User(req.body);

    user.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("sessions/new");
    });
  },
  Profile: (req, res) => {
    if (req.session.user) {
      const email = req.session.user.email;
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          throw err;
        }
        Post.find({ user: user })
          .populate("user")
          .exec((err, posts) => {
            if (err) {
              throw err;
            }
            // const user = req.session.user;
            console.log(user);
            console.log(posts);
            res.render("users/profile", {
              posts: posts.reverse(),
              user: user,
            });
          });
        // res.render("users/profile", { user: user });
      });
    }
  },
};

module.exports = UsersController;
