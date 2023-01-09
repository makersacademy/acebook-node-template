const FriendsController = {
    Index: (req, res) => {
      //list of friends to be sent as an argument
      res.render("friends/index", { title: "Furrends", shownavbar:true });
    },

    Follow: (req,res) => {
      const user1 = req.session.user.id
      //this should get the current users id that can be put into the db
      console.log(user1)
      //basically we need to get the user2 which will be either from the post or friend page? 
      //how would this be implemented? if we can only follow those who post? 
      //use findOne using the username to get the id and add to the friends database
      //.create() then .save()
      //when hovering over someone who you follow, this should change to unfollow.
      res.render("friends/index")
    }
  };
  //methods for the friends
  //follow
  //unfollow
  module.exports = FriendsController;