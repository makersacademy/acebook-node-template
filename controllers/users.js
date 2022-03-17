const User = require("../models/user");
const Post = require("../models/post");
const bcrypt = require("bcrypt")
const saltRounds = 10;

const UsersController = {

  Show: (req, res) => {
    User.findOne({_id: req.params.id })
      .then((user) => { 
        if (!user) { return res.status(404).send("Not Found") } 

        Post.find().where('_id').in(user.posts).exec((err, posts) => {
          res.render("users/show", { user: user, posts: posts });
        });
        
      })
      .catch((err) => {
        res.status(404).send(`Error - ${err}`)
      })
  },

  New: (req, res) => {
    res.render("users/new", {title: "Acebook - Sign up"});
  },

  Create: (req, res) => {

    const hash = bcrypt.hashSync(req.body.password, saltRounds);
    req.body.password = hash

    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        throw err;
      }
      req.session.user = user;
     
      res.status(201).redirect("/posts");
    });
  },

};

module.exports = UsersController;
