const User = require("../models/user");
const Post = require("../models/post");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt")
const saltRounds = 10;

const UsersController = {

  Show: (req, res) => {
    User.findOne({_id: req.params.id })
      .then((user) => { 
        if (!user) { return res.status(404).send("Not Found") } 

        const profilePic = user.profilePic.data.toString('base64')

        Post.find().where('_id').in(user.posts).exec((err, posts) => {
          res.render("users/show", { user: user, posts: posts, profilePic: profilePic });
        });
        
      })
      .catch((err) => {
        res.status(404).send(`Error - ${err}`)
      })
  },

  Upload: (req, res) => {
    console.log("Inside Upload")

    User.findOne({ _id: req.session.user._id }).then((user) => {

      user.profilePic.data = fs.readFileSync(path.join('./uploads/' + req.file.filename))
      
      user.profilePic.contentType = 'image/jpeg'
    
      user.save((err) => {
        if (err) {
          throw err
        }
      })
      res.status(201).redirect(`/users/${req.session.user._id}`);
    })
  },

  New: (req, res) => {
    res.render("users/new", {title: "Acebook - Sign up"});
  },

  Create: (req, res) => {

    const hash = bcrypt.hashSync(req.body.password, saltRounds);
    req.body.password = hash

    const user = new User(req.body);

    user.profilePic.data = fs.readFileSync('./public/images/test_image.jpg')
    user.profilePic.contentType = 'image/jpeg'

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
