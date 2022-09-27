const User = require("../models/user");

const addFriendsController = {
  Search: (req, res) => {
    if (!req.session.user) {
      res.redirect("/sessions/new");
    } else {
      const searchTerm = req.body.searchTerm;
      let results = [];

      if (!searchTerm) {
        results = []
        res.render("addFriends/index", { results: results });
      } else {
        // find Users
        User.find({
          name: { $regex: searchTerm },
        }).then((users) => {
          // get their images
          users.forEach((user, i) => {
            user.image = user.image.data.toString("base64");

            // pass to results
            results.push(user);
          });

          res.render("addFriends/index", { results: results });
        });
      }
    }
  },
};

module.exports = addFriendsController;
