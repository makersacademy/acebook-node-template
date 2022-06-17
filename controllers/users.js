const User = require("../models/user");
const Post = require("../models/post");
const fs = require('fs');
const path = require('path');

const UsersController = {

  Index: (req, res) => {
    
    console.log("Checking", req.session.userName);
    if(!req.session.userName) {
      res.redirect("/");
      return;
    }

    const postSearch = Post.find({userID: req.session.userID})
    .sort({'date': -1})
    .limit(10)
    .exec();

    const userSearch = User.findOne({_id: req.session.userID})
    .exec();

    Promise.all([postSearch, userSearch]).then( searchResults => {
      const locations = ["Bumpass, Virginia", "Hell, Norway", "Titty Hill, England", "Sandy Balls, England"]
      const statuses = ["A Mongoose never tells", "Already ordered 15 cats", "Depends on who's asking"]
      res.render("users/profile", 
        { userName: req.session.userName, 
          posts: searchResults[0],
          requests: searchResults[1].requests,
          friends: searchResults[1].friends,
          photo: {
            contentType: searchResults[1].photo.contentType,
            data: searchResults[1].photo.data.toString('base64')
            },
          age: Math.floor(Math.random() * 101),
          location: locations[Math.floor(Math.random() * locations.length)],
          relation_status: statuses[Math.floor(Math.random() * statuses.length)]
        });
    })
  },

  New: (req, res) => {
    res.render("users/new", { newUser: true });
  },

  Create: (req, res) => {
    const photo = {
      data: fs.readFileSync(path.join(__dirname + '/../uploads/' + req.file.filename)),
      contentType: req.file.mimetype,
    };

    const user = new User({ ...req.body, photo });
    user.save((err) => {
      if (err) {
        throw err;
      }
      req.session.user = user; // login in user straight away after sign up and redirect to posts page
      req.session.userID = user._id;
      req.session.userName = user.userName;
      res.status(201).redirect("/posts");
    });
    console.log(req.file)
  },
};

module.exports = UsersController;
