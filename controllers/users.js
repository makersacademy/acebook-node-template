const session = require("express-session");
const User = require("../models/user");
const Friends = require("../models/friend");

const UsersController = {
  Profile: (req, res) => {
    User.findOne({ username: req.params.username }, async (err, user) => {
      if (err) {
        throw err;
      }
      res.render("users/profile", {
        user: user,
        session: req.session,
        pageOwnerBool: user.username === req.session.user.username,

        // we are friends - tbc need to test with the button
        friendsBool: await Friends.find( {
          status: "1",
          $or: 
            [ {requester: user.id, recipient: req.session.user._id},
            {requester: req.session.user._id, recipient: user.id} ],
          }),

        // there is a request but we are not friends. Either of use could have sent the request
        friendRequestedBool: await Friends.find( {
          status: "0",
          $or: 
          [ {requester: user.id, recipient: req.session.user._id},
            {requester: req.session.user._id, recipient: user.id} ],
          }),

        // there is a request. I have sent the request  
        // I invited Ahmed, I'm going to his page. This is what I see
        myRequestBool: await Friends.find( {
          status: "0",
          requester: req.session.user._id, recipient: user.id,
        }),

        // A method for friends requests page
        // there is a request. They have sent the request
        theirRequestBool: await Friends.find( {
          status: "0",
          requester: user.id, recipient: req.session.user._id,
          }),
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
        res.status(201).redirect("/posts");
      });
    },
    
    Search: (req, res) => {
      User.find(
        {
          $or: [
            { firstName: { $regex: req.query.search, $options: "i" } },
            { lastName: { $regex: req.query.search, $options: "i" } },
            // { email: { $regex: req.query.search, $options: "i" } },
            { username: { $regex: req.query.search, $options: "i" } },
          ],
        },
        function (err, users) {
          if (err) {
            throw err;
          }
          res.render("users/search", { users: users });
        }
        );
      },
    };
    

  module.exports = UsersController;
