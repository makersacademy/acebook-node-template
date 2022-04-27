const Friend = require("../models/friend");
const User = require("../models/user");
const SessionsController = require("./sessions");
const UsersController = require("./users");

const FriendsController = {
  New: (req, res) => {
    User.find((err, users) => {
      if (err) {
        throw err;
      }
      
      User.findOne({email: req.session.user.email}, (err, user) => {
        if (err) {
          throw err;
        }

        const friends_list = user.friends;

      res.render("friends/index", { users: users.reverse(), friends_list: friends_list });
    });
   });
  },

  Add: (req, res) => {
    
    const friend = new Friend ({
      requester_email: req.session.user.email,  //req.session = user currently logged in
      receiver_email: req.body.receiver_email,  //req.body = "Friends Page" index.hbs form
    });

    friend.save((err) => {
      if (err) {
        throw err;
      }

      User.findOne({email: req.session.user.email}, (err, user) => {
        if (err) {
          throw err;
        }

        user.friends.push(req.body.receiver_email);
        
        user.save((err) => {
          if (err) {
            throw err;
          }
          res.status(201).redirect("/friends");
        });
      });
    }); 
  },
}; 

module.exports = FriendsController;