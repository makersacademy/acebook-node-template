const User = require("../models/user");


const FriendsController = {
    Index: (req, res) => {
      const user = req.session.user
      User.find({username: user.username}, { friends: 1 }, (err, friendsArray) => {
      if (err) {
        throw err;
      }
      //console.log(friendsArray[0].friends) - the find returns a list of objects which includes ids as well 
      //list of friends to be sent as an argument - this needs usercontroller and a method to list it
      res.render("friends/index", { title: "Furrends", shownavbar:true, friendslist:friendsArray[0].friends, user:user });
    })
  }
}
  
  // ShowFriends: (req, res) => {
  //   //const userId =  this needs to be sorted
  //   User.find({ username: 'pass' }, { friends: 1 }, (err, user) => {
  //     if (err) {
  //       throw err;
  //     }
  //     console.log(user[0].friends);
  // })}}

    // Follow: (req,res) => {
    //   const user1 = req.session.user.id
    //   //this should get the current users id that can be put into the db
    //   console.log(user1)
    //   //basically we need to get the user2 which will be either from the post or friend page? 
    //   //how would this be implemented? if we can only follow those who post? 
    //   //use findOne using the username to get the id and add to the friends database
    //   //.create() then .save()
    //   //when hovering over someone who you follow, this should change to unfollow.
    //   res.render("friends/index")
    
  
  //methods for the friends
  //follow
  //unfollow
  module.exports = FriendsController;