const Friend = require("../models/friend");
const User = require("../models/user");


const FriendsController = {
//   Profile: (req, res) => {
//     Friend.findOne({ username: req.params.username }, (err, user) => {
//       if (err) {
//         throw err;
//       }
//       res.render("users/profile", {
//         user: user,
//         session: req.session,
//       });
//     });
//   },

  // a path to create a request - should be on click - which page?
  // to change the path later

  New: (req, res) => {
    res.render("friends/new", {});  
  },

 
  Create: (req, res) => {
    console.log(req.params.username)
  //   const friendRequest = new Firends({requester: ,recipient: , status: '0'})
  //   const friendRequest = new Friend(req.body);
  //   friendRequest.save((err) => {
  //     if (err) {
  //       throw err;
  //     }
  //     res.status(201).redirect("/posts"); /// ???
  //   });
  // },

  //delete from friends once confirmed

// ?db.removeUser(username)
  // Create: (req, res) => {
  //   const friendRequest = new Friend(req.body);
  //   friendRequest.save((err) => {
  //     if (err) {
  //       throw err;
  //     }
  //     res.status(201).redirect("/posts"); /// ???
  //   });
  // },
  res.render("friends/new", {});
};

module.exports = FriendsController;
