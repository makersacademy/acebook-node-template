const User = require("../models/user");


const FriendsController = {
    Index: (req, res) => {
      const user = req.session.user.username
      User.find({username: user}, { friends: 1 }, (err, friendsArray) => {
      if (err) {
        throw err
  
      }
      //console.log(friendsArray[0].friends) - the find returns a list of objects which includes ids as well 
      //list of friends to be sent as an argument - this needs usercontroller and a method to list it
      res.render("friends/index", { title: "Furrends", shownavbar:true, friendslist:friendsArray[0], user:user });
    })
  }
}
  
  module.exports = FriendsController;