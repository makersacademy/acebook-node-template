const User = require("../models/user");
const Post = require("../models/post");

const UsersController = {

  New: (req, res) => {
    res.render("users/new", { title: "Sign up to Acebook", layout: "signup" });
  },

  Create: (req, res) => {
    const user = new User(req.body);
    // const email = user.email;

    user.save((err) => {
      if (err) {
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
      .populate({ 'path': 'remarks', 'populate': { 'path': 'user'}})
      .populate('friends')
      .populate('requests');
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
          session: session,
          user: user,
        })
      }).populate("friends")
      .populate("requests");
    },
    
    ConfirmRequest: (req, res) => {
      let answer = req.body.confirm
      let session = req.session.user
      let friend = req.body.id
      let friendIndex = session.requests.findIndex(i => i === friend)
      let updatedRequests = session.requests.filter(id => id !== friend)
        if (friendIndex === -1)
          {res.redirect('users/requests')}
        if (answer === 'Confirm')
          {User.findById(session._id, (err, user) => {
            if (err) {
              throw err;
            }
            if (user.friends.includes(friend))
              {console.log('Already friends')}
            else
              {user.friends.push(friend);}
            user.requests = updatedRequests;
            user.save((err) => {
            if (err) {
              throw err;
            }
            })
          })}
        if (answer === 'Reject') 
          {User.findById(session._id, (err, user) => {
            if (err) {
              throw err;
            }
            user.requests = updatedRequests;
            user.save((err) => {
            if (err) {
              throw err;
            }
            })})}
          User.findById(friend, (err, user) => {
            if (err) {
              throw err;
            }
            if (user.friends.includes(session._id))
              {console.log('Already Friends!')}
            else
              {user.friends.push(session._id);
            user.save((err) => {
              if (err) {
                throw err;
              }
            })}
          })
      session.requests = updatedRequests;
      res.redirect('/users/requests')
    },
}

module.exports = UsersController;