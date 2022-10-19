const User = require("../models/user");
const Post = require("../models/post");

const UsersController = {

  New: (req, res) => {
    res.render("users/new", { title: "Sign up to Acebook", layout: "signup" });
  },

  Create: (req, res) => {
    const user = new User(req.body);
    console.log(user)
    const email = user.email;
    console.log(email)

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
    let session = req.session.user
    let status = true
    let awaiting = false;
    let confirmed = false;
    let otherConfirmed = false;
    User.findById(id, (err, user) => {
      if (user.requests.includes(session._id))
      {status = false;
      awaiting = true;
      confirmed = false;
      otherConfirmed = false;}
      else if (user.friends.includes(session._id))
      {status = false;
        awaiting = false;
        confirmed = true;
        otherConfirmed = false;}
      else if (session.requests.includes(id)) {status = false;
        awaiting = false;
        confirmed = false;
        otherConfirmed = true;}
      else {status = true
        awaiting = false;
        confirmed = false;
        otherConfirmed = false;}
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
          awaiting: awaiting,
          confirmed: confirmed,
          otherConfirmed: otherConfirmed,
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
        {return res.redirect(`${friendId}`)}
        if (user.friends.includes(session._id))
        {return res.redirect(`${friendId}`)}
        
        user.requests.push(session._id)
        user.save((err) => {
          if (err) {
            // let display = "invalid email";
            // res.render("users/new", { message: display });
            throw err;
          }})
        {res.redirect(`${friendId}`)}
        
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
      User.findById(session._id,  (err, user) => {
        if (err) {
          throw err;
        }
        let requests = user.requests
        let friendIndex = requests.indexOf(friend)
        let updatedRequests = requests.splice(friendIndex, 1)
        if (answer === 'Confirm')
          {user.friends.push(friend);
          User.updateOne({_id: session._id }, {$set: {requests: updatedRequests}});
          User.findById(friend, (err, user) => {
            if (err) {
              throw err;
            }
            user.friends.push(session._id)
            user.save((err) => {
              if (err) {
                  // let display = "invalid email";
                  // res.render("users/new", { message: display });
                throw err;
              }
            })
            
          })
        }
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
