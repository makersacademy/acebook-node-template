const addFriendsController = {
  Search: (req, res) => {
    if (!req.session.user) {
      res.redirect("/sessions/new")
    } else {

      res.render("addFriends/index")
    }
  }
};

module.exports = addFriendsController;