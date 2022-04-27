const User = require("../models/user");
const path = require("path");
const util = require("../util/photoHandling");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Edit: (req, res) => {
    res.render("users/edit", {username: req.params.username});
  },

  SaveEdit: (req, res) => {
    if (req.body.email){
      User.findOne({username: req.params.username},(err,user) => {
        user.email = req.body.email
        user.save() 
        res.redirect("/posts")
      })

    }

    if (req.body.password){
      User.findOne({username: req.params.username},(err,user) => {
        user.password = req.body.password
        user.save()
        res.redirect("/posts")
      })
    
    }
    
  },

  Create: (req, res) => {
    if (req.files) {
      console.log("has been called");
      let photo = req.files.profilePicture;
      let newName = util.generateName() + "." + util.getExtension(photo.name);
      photo.mv("./public/upload/" + newName);
      req.body.profilePicture = newName;
    }

    // easter eggs
    if (req.body.username == "69") {
      req.body.username = "noice👍♋";
    }
    if (req.body.username == "rick") {
      res
        .status(418)
        .redirect(
          "https://www.youtube.com/watch?v=xvFZjo5PgG0&ab_channel=Duran"
        );
      return;
    }

    const user = new User(req.body);
    let error = user.validateSync();
    if (error) {
      res.redirect("/users/new");
      return;
    }

    user.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
    });
  },

  ProfilePicture: (req, res) => {
    const username = req.params.username;
    User.findOne({ username: username }, function (err, user) {
      // if requesting the user returned an error or didn't return a user at all...
      if (err || !user) {
        // ...send back default pf
        res
          .status(200)
          .sendFile(path.join(__dirname, "../public/upload", "default.png"));
      } else {
        // otherwise, send back the user's pf
        res
          .status(200)
          .sendFile(
            path.join(__dirname, "../public/upload", user.profilePicture)
          );
      }
    });
  },

  Befriend: async (req, res) => {
    const requester = await User.findOne({ "username" : req.session.user.username });
    const target = await User.findOne({ "username": req.params.username });

    if (requester.friends.includes(target._id)) {
      target.friends.splice(requester._id);
      requester.friends.splice(target._id);
    } else {
      target.friends.push(requester._id);
      requester.friends.push(target._id);
    }

    target.save();
    requester.save();

    res.status(201)
       .redirect('/users/profile/' + req.query.return_to);
  },

  Profile: (req, res) => {
    User.findOne({ "username": req.params.username }, async (err, user) => {
      let friends = [];
      for (let i = 0; i < user.friends.length; i++) {
        const id = user.friends[i];
        friends.push(await User.findById(id));
      }

      res.render("users/profile", {
        user: user,
        me: req.session.user._id,
        friends: friends,
      });
    })
  },
};

module.exports = UsersController;
