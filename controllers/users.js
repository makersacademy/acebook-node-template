const bcrypt = require('bcrypt')
const cookies = require('cookie-parser')

var Users = require('../models/users'); // connects to the model which allows you to access the users database
var Posts = require('../models/post'); // connects to the model which allows you to access the posts database for display in the user bio

var UsersController = { // this refers to the class
  Index: function(req, res) { //this refers to the method
    res.render('users/register', {}); // render the user register page
  },//every method/function needs to be followed by a comma

  Create: function(req, res) {

    if (req.body.password === req.body.repeat_password) { //if the first password entered is equal to the second password entered

      let passwordHash = bcrypt.hashSync(req.body.password, 10); // encrypts password using bcrypt module

      var users = new Users({ // creates a new instance of users with the text, with respeats to the form that is created in the model &view

        fullname: req.body.fullname,
        email: req.body.email,
        username: req.body.username,
        password: passwordHash //adds encrypted password to the database

      });

      Users.findOne({
        username: req.body.username
      }, function(err, check) { // checks if the inputted username is in the db
        console.log(req.body.username)
        if (err) {
          throw err;
        } else if (check !== null) {
          res.render('ourErrors', {
            error: "Username already taken. Please enter a different username."
          })
        } // if it's not set the check to true
        else {
          users.save(function(err) { // if the user doesn't exist then save the user details (aka register them)
            if (err) {
              throw err;
            }

            res.status(201).redirect('/users/login');
          })
        }
      })
    } else {
      res.render('ourErrors', {
        error: "Passwords do not match"
      });
    }
  },


  Login: function(req, res) {
    res.render('users/login', {}); // render the user login page
  },

  Authenticate: function(req, res) { //this function is executed and posted when user logins
    Users.findOne({
      email: req.body.email //this checks that the text entered in the form id email can be found in the database
    }, function(err, user) {
      if (err) {
        throw err;
      }

      if (user) { //if user can be found in the database
        if (bcrypt.compareSync(req.body.password, user.password)) { //this compares the entered password with the encrypted password in the database
          res.cookie('username', user.username) // this sets a cookie for the current logged in user
          // var username = req.cookies['username'];     // sets username variable to the cookies username
          res.redirect('/posts') //once the user has logged in they are redirected to the posts page
        } else {
          res.render('ourErrors', { error: "Username or password does not match"});
        };
      }
    })
  },

  Bio: function(req, res) { //this function renders the user's profile/bio
    Users.findOne({ // gets the currently logged in user from the db
      username: req.cookies['username']
    }, function(req, name) { //the returned user is called name
      status = name.rStatus  //relationship status is equal to returned user.rstatus
      Posts.find({
        postedby: name.username //the returned user's username is used to find posts posted by them
      }, {}, {
        limit: 3, //limit to 3 posts
        sort: '-time'
      }, function(req, posts) {
        Posts.find({
          tags: name.username //the returned user's username is used to find tags they are tagged in
        }, {}, {
          limit: 3, //limit to 3 tags
          sort: '-time'
        }, function(req, tagged) {

          res.render('users/profile', { // this page is only for viewing the profile
            user: name, // passes in the current users info for the page to use when it renders
            posts: posts, // passes in the 3 most recent posts
            tagged: tagged, //passes in 3 tags
            rStatus: status, //passes in their relationship status in order to display it
          });
        })
      })
    });
  },

  EditBio: function(req, res) { //this function gets executed when the user clicks edit bio on their profile
    Users.findOne({
      username: req.cookies['username'] //return all of the information on the currently logged in user in the database
    }, function(req, name) {
      res.render('users/profile_edit', { // this page allows for the editing of the profile
        user: name //name refers to the returned result
      });
    })
  },

  NewBio: function(req, res) { //this posts the edited bio
    // console.log(req.body.biobox)
    Users.findOneAndUpdate({ // used to edit the info on a specific document
      username: req.cookies['username'] // filters to only update logged in users doc
    }, {
      bio: req.body.biobox // updates the bio to be that which was entered in the textarea of the profile_edit page
    }, {
      upsert: true // allows for the bio to be created if it doesnt exist
    }, function() {});

    res.redirect('/users/profile'); // redirects to the viewing profile page
  },
    Logout: function(req, res) {
      res.clearCookie('username') //this clears the cookie of the logged in user
      res.redirect('/') //redirects user to the homepage once they are logged out
    },

    Search: function(req, res) {    // renders the page to search for a users name
      res.render('users/search')
    },

    Query: function(req, res) {     // this function posts the search result
      // var input = 'ln';
      Users.find({fullname: new RegExp(req.body.fullname, 'i')}, function(err, foundUsers) {      // find the users in the database with the name you searched (doesn't have to be exact, so can be partially matching because of the regex)
        if(err) {
          throw err;
        } else if (foundUsers.length !== 0){ //if found users is greater than 0
            // console.log("Look here")
            // console.log(foundUsers)
            res.cookie('foundUsers', foundUsers)        // set the cookie foundusers to the list of users found
            res.redirect('/users/search/results')     // redirect to the results page
          } else {
            res.render('ourErrors', { error: "No users found"});     // if no users found error page
              }
          })
        },

    Results: function(req, res) {
      var foundUsers = req.cookies['foundUsers'];         // set foundusers to the cookie (passed from previous function)
      res.render('users/search-results', {users: foundUsers});     // render the page listing the found users with links to their profiles
    },

    ViewProfile: function(req, res) { //this renders other users profile - this comes from the users/index view which includes a link that posts the searched user's username
      Users.findOne({username: req.params.username} , function(err, user) {     // find user's profile you clicked on
        if(err) {throw err}

        Posts.find({
          postedby: req.params.username //find posts by the user that you searched for and clicked on
        }, {}, {
          limit: 3,
          sort: '-time'
        }, function(require, posts) {

          Posts.find({
            tags: req.params.username //find tags the user that you searched for and clicked on is tagged in
          }, {}, {
            limit: 3,
            sort: '-time'
          }, function(req, tagged) {

            res.render('users/viewProfile', { // this page is only for viewing the profile
              user: user, // passes in the current users info for the page to use when it renders
              posts: posts, // passes in the 3 most recent posts
              tagged: tagged
            });

          })
          // res.render('users/viewProfile', { // this page is only for viewing the profile
          //   user: user, // passes in the current users info for the page to use when it renders
          //   posts: posts // passes in the 3 most recent posts
          // });
        })
    })
    },


    AddFriend: function(req,res) { //this function executes/posts when you go on another users profile and click add friend
      // console.log(req.params.username)
      var befriender = req.params.username ;
      var requester  = req.cookies['username'];
      // console.log(requester)

      Users.findOne({username: befriender },function(err, befriender) {   // find the user that the requester is trying to add
        if(err) {
          console.log(err);
          res.status(500).send();
        } else {
            if (!befriender) {
            res.status(404).send();
          } else {
            befriender.friendrequests.push(requester);     // add the requester to the users friend requests
            befriender.save(function(err, updatedObject) {     // save
              if(err) {
                console.log(err);
                res.status(500).send();
              } else {
               return res.redirect('/users/' + befriender.username);
            }
          });
        }
      }
    });
  },

  UpdateRStatus: function(req, res) {
    // console.log("RELATIONSHIP BELOW");
    // console.log(req.body.relationships);
    Users.findOne({ // gets the currently logged in user from the db
      username: req.cookies['username']
    }, function(require, name) { //name refers to the returned user information from the database
      name.rStatus = req.body.relationships //this sets the rstatus field of the returned user equal to what relationship the user chose
      name.save(function(err, updatedObject) {     // save
        if(err) { throw err }
        else {
    res.redirect('/users/profile')}
  })
})
},

Requests: function(req, res) { //this function executes when the user clicks on friend requests on their profile
  Users.findOne({
    username: req.cookies['username'] //this returns user information using the cookie of the logged in user
  }, function(err, user){
    if(err) {throw err}
    // console.log(user)
    res.render('users/requests', { user: user });
  })
},

Accept: function(req, res) { //this function gets rendered/posted when a user clicks on accept
  var requester = req.params.username ; //this gets the username of the user who requested to be added to friends
  var user  = req.cookies['username']; //this gets the logged in user/user who is accepting/declining requests

  Users.findOne({ username: user },function(err, user) { //this returns user information for the logged in user (who is accepting/declining friend requests)
    if(err) {
      console.log(err);
      res.status(500).send();
    } else {
        user.friendrequests.pull(requester); //once the logged in user accepts a friend request, it gets removed from their list of friendrequests
        user.friendslist.push(requester); //once the logged in user accepts a friend request, it gets added to their friendslist
        user.save(function() {} ); //save
    }
  })

  Users.findOne({ username: requester },function(err, requester) { //this returns user information for user who requested to be added to friends
    if(err) {
      console.log(err);
      res.status(500).send();
    } else {
        requester.friendslist.push(user); //if their friend request is accepted then the user who accepted their friend request is added to their friends list
        requester.save(function() {} );
    }
  });
  res.redirect('/users/profile')
},

Decline: function(req, res) { //this function gets rendered/posted when a user clicks on decline friend request
  var requester = req.params.username ; //this gets the username of the user who requested to be added to friends
  var user  = req.cookies['username']; //this gets the logged in user/user who is accepting/declining requests
  Users.findOne({ username: user },function(err, user) { //this returns user information for the logged in user (who is accepting/declining friend requests)
    if(err) {
      console.log(err);
      res.status(500).send();
    } else {
        user.friendrequests.pull(requester); //if user declines friend request then remove the user who requested to be friends from the user's list of friend requests
        user.save(function() {} );
    }
  })
  res.redirect('/users/profile')
},
};

module.exports = UsersController;
