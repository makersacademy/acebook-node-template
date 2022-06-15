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
  }
}

module.exports = FriendsController;