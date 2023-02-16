const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {layout: 'users/new'});
  },

  Create: (req, res) => {
    const email = req.body.email;
    User.findOne({ email: email }).then((user) => {
      if (user) {
        res.render("users/new", {layout: "users/new", error: "Email already in use"})
      }
    });

    if (req.body.password == req.body.confirm_password) {
      const user = new User(req.body); 
      user.save((err) => {
        if (err) {
          throw err;
        }
        // create new session here 
        req.session.user = user
        res.status(201).redirect("/posts");
      });
    } else {
      res.redirect("/users/new");
    }
  },

  Messages: (req, res) => {
    const user = req.session.user || {
      username: 'guest',
      firstName: 'guest',
      lastName: 'guest',
    };
    res.render("users/messages", {user})
  },

  Friends: (req, res) => {
    const user = req.session.user
    console.log(user)
    res.render("users/friends", {user: user})
  },

  Notifications: (req, res) => {
    const user = req.session.user || {
      username: 'guest',
      firstName: 'guest',
      lastName: 'guest',
    };
    res.render("users/notifications", {user})
  },

  Profile: (req, res) => {
    const user = req.session.user
    console.log(user)
    res.render("users/profile", {user: user})
  },

  Search_friends: async (req, res) => {
    const foundUser = await User.find({username: req.query.username})
     
      if (req.query.username === req.session.user.username) {
        res.render("users/search_friends");
      } else {
        res.render("users/search_friends", {foundUser: foundUser});
      }

   },
};

module.exports = UsersController;
