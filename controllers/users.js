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
    const theirId = req.params.id;
    const hostId = req.session.user._id;

    User.findOneAndUpdate({"_id": hostId, "friends.user_id": theirId}, {"$set": {"friends.$.status": "confirmed"}}, (err, user) => {
      if (err) {
        throw err;
      }
      console.log(user);
      res.status(201).redirect(`/users/${hostId}`);
    });
  },

  Deny: (req, res) => {
    const theirId = req.params.id;
    const hostId = req.session.user._id;

    User.findOneAndUpdate({"_id": hostId, "friends.user_id": theirId}, {"$set": {"friends.$.status": "denied"}}, (err, user) => {
      if (err) {
        throw err;
      }
      console.log(user);
      res.status(201).redirect(`/users/${hostId}`);
    });
  },
};

module.exports = UsersController;
