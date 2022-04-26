const Friend = require("../models/friend");
const User = require("../models/user");

const FriendsController = {
  New: (req, res) => {
    User.find((err, users) => {
      if (err) {
        throw err;
      }
      res.render("friends/index", { users: users.reverse() });
    });
  },

  List: (req, res) => {

    User.find((err, users) => {
      if (err) {
        throw err;
      }

      res.render("friends/result", { users: users.reverse() });
    });
  },

  Add: (req, res) => {
    console.log("------------------");
    console.log("DOES THIS WORK?");
    console.log("------------------");

    console.log("------------------");
    console.log(req.body);
    console.log("------------------");

    console.log("------------------");
    console.log(req);
    console.log("------------------");


    res.status(201).redirect("/friends");
  },

}; 

// User.findOne({
//   first_name: req.body.first_name,
//   last_name: req.body.last_name,
// }, (err, docs) => {
//   if (err) {
//     throw err;
//   }
// })

module.exports = FriendsController;
