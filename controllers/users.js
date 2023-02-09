const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {error: req.session.error});
  },

  Create: (req, res) => {
    const user = new User(req.body);

    User.findOne({email : user.email}, (err, founduser) => {
      if (err) {
        throw err;
      }

      if (founduser === null) {
        user.save((err) => {
          if (err) {
            throw err;
          }
          res.status(201).redirect("/sessions/new");
        });
      } else {
        req.session.error = "INVALID USERNAME OR PASSWORD";
        res.redirect("/users/new");
      }
    })
  },
  
  Details: (req, res) => {
    const userId = req.params.id;

    User.findById(userId, (err, user) => {
      if (err) {
        throw err;
      }
      res.render("users/details", {user: user});
    });
  },

  Request: (req, res) => {
    const currentId = req.session.user._id;
    const targetId = req.params.id;

    User.findById(targetId, (err, user) => {
      if (err) {
        throw err;
      }
      if (user.friends.filter(object => object.user_id === currentId).length === 0) {
        user.friends.push({user_id: `${currentId}`, status: "pending"})

        user.save((err) => {
          if (err) {
            throw err;
          }
        });
      }
      res.status(201).redirect(`/users/${targetId}`);
    });
  },

  Confirm: (req, res) => {
    console.log("confirmed")
    const theirId = req.params.id;
    const hostId = req.session.user._id;

    // User.findOneAndUpdate({_id: hostId}, {friends: [{user_id: theirId, status: "confirmed"}]});

    // User.findOneAndUpdate({ "_id": hostId }, {"$set": {"status": "confirmed"}})

    // res.status(201).redirect(`/users/${theirId}`);
    User.findOneAndUpdate({"_id": hostId, "friends.user_id": theirId}, {"$set": {"friends.$.status": "confirmed"}}, (err, user) => {
      if (err) {
        throw err;
      }
      console.log(user);
      res.status(201).redirect(`/users/${hostId}`);
    });

    // User.findById(hostId, (err, user) => {
    //   if (err) {
    //     throw err;
    //   }
    //   // for(let i = 0; i < user.friends.length; i++) {
    //   //   if(user.friends[i]["user_id"] === theirId) {
    //   //     user.friends[i]["status"] = "confirmed";
    //   //   }
    //   // }
    //   // user.save((err) => {
    //   //   if (err) {
    //   //     throw err;
    //   //   }
    //   //   let stat = user.$isNew;
    //   //   console.log(stat);
    //   //   res.status(201).redirect(`/users/${theirId}`);
    //   // });
    //   // User.updateOne({_id: hostId}, {friends: [{user_id: theirId, status: "confirmed"}]})
    //   // res.status(201).redirect(`/users/${theirId}`);
    // });
  },

  Deny: (req, res) => {
    const otherId = req.params.id;
    const hostId = req.session.user._id;

    User.findById(hostId, (err, user) => {
      if (err) {
        throw err;
      }
      for(let i = 0; i < user.friends.length; i++) {
        if(user.friends[i]["user_id"] === otherId) {
          user.friends[i]["status"] = "denied";
          user.save((err) => {
            if (err) {
              throw err;
            }
          });
          console.log(user);
        }
      }
      res.status(201).redirect(`/users/${otherId}`);
    });
  },
};

module.exports = UsersController;
