const User = require("../models/user");
const Post = require("../models/post");

const UsersController = {

  New: (req, res) => {
    res.render("users/new", { title: "Sign up to Acebook", layout: "signup" });
  },

  Create: (req, res) => {
    const user = new User(req.body);
    const email = user.email;
    console.log(email);
    user.save((err) => {
      if (err) {
        // let display = "invalid email";
        // res.render("users/new", { message: display });
        throw err;
      }
      res.status(201).redirect("/sessions/new");
    });
  },

  Profile: (req, res) => {
    let session = req.session.user;
    Post.find({"user": session._id}, (err, posts) => {
      if (err) {
        throw err;
      }

      res.render("users/index", {
        posts: posts.reverse(),
        user: session,
      })
    })
      .populate("user")
      .populate("remarks")
      .populate({ 'path': 'remarks', 'populate': { 'path': 'user'}});


  },

  OtherProfile: (req, res) => {
    if (req.params.id === req.session.user._id)
    {res.redirect('index')}
    let id = req.params.id;
    console.log(id)
    let session = req.session.user
    console.log(session)
    let status = "Add friend"
    User.findById(id, (err, user) => {
      console.log(user);
      if (user.requests.includes(session._id))
      {status = "Awaiting"}
      if (user.friends.includes(session._id))
      {status = "You're friends"}
      if (err) {
        throw err;
      }
      Post.find({"user": id}, (err, posts) => {
        if (err) {
          throw err;
        }
  
        res.render("users/:id", {
          posts: posts.reverse(),
          user: user,
          status: status,
        })
      })
        .populate("user")
        .populate("remarks")
        .populate({ 'path': 'remarks', 'populate': { 'path': 'user'}})
        ;
  
      });
    },
    FriendRequest: (req, res) => {
      let friendId = req.params.id;
      let session = req.session.user;
      User.findById(friendId, (err, user) => {
        if (err) {
          throw err;
        }
        if (user.requests.includes(session._id))
        {return res.redirect(`users/${friendId}`)}
        if (user.friends.includes(session._id))
        {return res.redirect(`users/${friendId}`)}
        
        user.requests.push(session._id)
        user.save((err) => {
          if (err) {
            // let display = "invalid email";
            // res.render("users/new", { message: display });
            throw err;
          }})
        {res.redirect(`users/${friendId}`)}
        
       })

    },
    Requests: (req, res) => {
      
      let session = req.session.user;
      User.findById(session._id, (err, user) => {
        if (err) {
          throw err;
        }
        res.render('users/requests', {
          user: user,
        })
      }).populate("friends")
      .populate("requests");
    },

    ConfirmRequest: (req, res) => {
      let session = req.session.user;
      let answer = req.body.confirm
      let friend = req.body.id
      if (answer === 'Confirm')
      User.findById(session._id,  (err, user) => {
        if (err) {
          throw err;
        }
        let requests = user.requests
        let friendIndex = requests.indexOf(friend)
        let updatedRequests = requests.splice(friendIndex, 1)
        if (answer === 'Confirm')
          {user.friends.push(friend);
          console.log(updatedRequests)
          User.updateOne({_id: session._id }, {$set: {requests: updatedRequests}});}
        if (answer === 'Reject')
          {User.updateOne({_id: session._id }, {$set: {requests: updatedRequests}});}
        user.save((err) => {
          if (err) {
              // let display = "invalid email";
              // res.render("users/new", { message: display });
            throw err;
          }
        })
        res.render('users/requests', {
          user: user,
        })
      }) 
        .populate("friends")
        .populate("requests");       
    },
    }

module.exports = UsersController;
