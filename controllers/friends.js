const User = require("../models/user")

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
    const sessionUser = User.findById(req.session.userID);
    const aquaintnce = User.findById(req.body.id);
    
    Promise.all([sessionUser, aquaintnce]).then( searchResults => {
      User.findOne({_id: searchResults[1]._id},
        (err, result) => {
          if(result.requests.includes(searchResults[0]._id)) {
            User.findOneAndUpdate(
              {_id: searchResults[1]._id},
              {$pull:
                {requests: searchResults[0]}
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
            {_id: searchResults[1]._id},
            {$push:
              {requests: searchResults[0]}
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
    })
  },
  Accept: (req, res) => {
    console.log(req.body.userID)
    console.log(req.session.userID)
    User.findById(req.body.userID)
    .exec((err, user) => {
      if(err) {
        console.log(err);
        throw err;
      }
      console.log("got to 64")
      const friend = user;
      User.findOneAndUpdate(
        {_id: req.session.userID},
        {$pull:
          {requests: user}
        },
        (err) => {
          if(err) {
            console.log(err);
            throw err;
          }
          console.log("got to 76")
          User.findOneAndUpdate(
            {_id: req.session.userID},
            {$push:
              {friends: friend}
            },
            {new: true},
            (err) => {
              if(err) {
                console.log(err);
                throw err;
              }
              console.log("got to 88")
              res.redirect('/users/profile')
            }
          )
        }
      )
    })
  },
  Reject: (req, res) => {
    User.findById(req.body.userID)
    .exec((err, user) => {
      if(err) {
        console.log(err);
        throw err;
      }
      User.findOneAndUpdate(
        {_id: req.session.userID},
        {$pull:
          {requests: user}
        },
        (err) => {
          if(err) {
            console.log(err);
            throw err;
          }
          res.redirect('/users/profile')
        }
      )
  })}
}

module.exports = FriendsController;