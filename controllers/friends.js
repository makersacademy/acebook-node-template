const User = require("../models/user")
const Posts = require("../models/post")
const FriendsController = {
  Search: (req, res) => {
    User.find( 
      {userName:{'$regex' : req.body.userName, '$options' : 'i'}}
    )
    .exec((err, users) => {
      if(err) {
        throw err;
      }
      res.render("friends/search", { users: users });
      }
    );
  },
  Request: (req, res) => {
    User.findOne({_id: req.body.id},
      (err, result) => {
        if(result.requests.includes(req.session.userID)) {
          User.findOneAndUpdate(
            {_id: req.body.id},
            {$pull:
              {requests: req.session.userID}
            }, 
            {
              new: true // <- setting the new option to true to return the document after update was applied
            },
            (err, result) => {
              console.log(err);
              console.log(result);
              res.redirect('/users/profile')
            })
        } else {
        User.findOneAndUpdate(
          {_id: req.body.id},
          {$push:
            {requests: req.session.userID}
          }, {
            new: true
          },
          (err, result) =>{ 
            console.log(err);
            console.log(result);
            res.redirect('/users/profile')
          }
        )} 
      }
    )
  },

  Retrieve: (req, res) => {
    const user = User.findOne({_id: req.body.id})
    const posts = Posts.find({userID: req.body.id})

    Promise.all([user, posts]).then((searchResults) => {
      const photo = {
        contentType: searchResults[0].photo.contentType,
        data: searchResults[0].photo.data.toString('base64'), // <- user photo added to profile page
      };
      const locations = ["Bumpass, Virginia", "Hell, Norway", "Titty Hill, England", "Sandy Balls, England"]
      const statuses = ["A Mongoose never tells", "Already ordered 15 cats", "Depends on who's asking"]
      res.render("friends/profile", { 
        userName: searchResults[0].userName,
        posts: searchResults[1],
        photo: photo,
        age: Math.floor(Math.random() * 101),
        location: locations[Math.floor(Math.random() * locations.length)],
        relation_status: statuses[Math.floor(Math.random() * statuses.length)]
      });
    })
    }
}


module.exports = FriendsController;