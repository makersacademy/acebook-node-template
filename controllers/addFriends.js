const User = require("../models/user");

const addFriendsController = {
  Search: async (req, res) => {
    if (!req.session.user) {
      res.redirect("/sessions/new");
    } else {
      const searchTerm = req.query.searchTerm;
      
      let results = [];
      if (searchTerm) {
        results = await User.find({
          firstName: new RegExp(searchTerm, 'i')
        }, 'firstName email image').exec();

        results = await results.map(user => (
          { ...user._doc, image: user.image.data.toString('base64') }
        ));
      }
      
      res.render('addFriends/index', { results: results });
    }
  },
};

module.exports = addFriendsController;
