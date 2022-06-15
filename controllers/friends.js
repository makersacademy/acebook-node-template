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
        });
    }
  }

module.exports = FriendsController;