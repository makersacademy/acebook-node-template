const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
    });
  },

  Profile: (req, res) => { 
    const user = req.session
    res.render("users/profile", {user: user})
  }, 

  Friend: async (req, res) => { 
    const id = await User.find({username: req.params.name }, {content: 1})
    const info = await User.findById(id)
    res.render("users/friend", {name: info.username, email: info.email, pic: info.profilePic})
  },
  
  AddFriend: async (req, res) => { 
    const myId = await req.session.user._id
    const username = await req.params.name
    User.updateOne({_id: myId}, { $push: {friends: username}}, (err) => { 
      if (err){ 
        throw err;
      }
    
      res.status(201).redirect("/posts");
    })
  }
};

module.exports = UsersController;