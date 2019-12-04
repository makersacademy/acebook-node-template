var FriendRequest = require('../models/friendRequest');

var FriendRequestController = {
    Create: function(req, res) {
      if(!req.cookies.userId) {
        res.redirect("/");
      } else {
        var friendRequest = new FriendRequest({
            requester: req.cookies.userId,
            recipient: req.body.userId,
            status: 1
        }); 
        friendRequest.save(function(err, user) {
            if (err) {throw err; }
            res.redirect(`/user/${req.body.userId}`)
        });
      }
    },
    Index: function(req, res) {
      if(!req.cookies.userId) {
        res.redirect("/");
      } else {
        FriendRequest.find({recipient: req.cookies.userId, status: 1}, function(err, users) {
          if(err) { throw err;}
          console.log(users)
          if(users) {
            res.render("user/requests", { users: users })
          } else {
            res.render("user/requests", { users: "No requests"})
          }
          
        })
      }
    }
}
    
  
module.exports = FriendRequestController;
  