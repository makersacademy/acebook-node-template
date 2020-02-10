const bcrypt = require('bcrypt')
// const cookies = require('cookie-parser')
// const popupS = require('popups')



var Users = require('../models/users');  // connects to the model which allows you to access database

var UsersController = {
    Index: function(req, res) {
        res.render('users/register', {});  // render the user index view folder
    },

    Create: function(req, res) {

        if (req.body.password === req.body.repeat_password) {

            let passwordHash = bcrypt.hashSync(req.body.password, 10); // encrypts password using bcrypt module

            var users = new Users ({ // creates a new instance of users with the text, with respeats to the form that is created in the model &view

                fullname: req.body.fullname,
                email: req.body.email,
                username: req.body.username,
                password: passwordHash

            });
                Users.findOne({username: req.body.username}, function(err, check) {  // checks if the inputted username is in the db
                  console.log("USERNAME IS HERE")
                  console.log(req.body.username)
                  if(err) { throw err; }

                  else if(check !== null) {
                    res.render('ourErrors', {error: "Username already taken. Please enter a different username."})  }               // if it's not set the check to true

                  else{
                    users.save(function(err) { // saves the new post
                      if (err) { throw err; }

                      res.status(201).redirect('/users/login');
                    })
                  }
                }
                )}

        else {
          // res.render('error', { message: 'Incorrect password' });
                // document.getElementById('demo').innerHTML = "You have entered the wrong password!";
            //     popupS.window({
            //         mode: 'alert',
            //         content: "Your password did not Match"
            //     });

                res.render('ourErrors', { error: "Passwords do not match"});
            }
          },


    Login: function(req, res) {
      res.render('users/login', {});  // render the user index view folder
    },

    Authenticate: function(req, res) {
      Users.findOne({ email: req.body.email }, function(err, user) {
        if(err) {throw err;}

        if(user) {
          if(bcrypt.compareSync(req.body.password, user.password)) {
            res.cookie('username', user.username)            // getting cookie for the current logged in user
            var username = req.cookies['username'];     // sets username variable to the cookies username
            res.redirect('/posts')
          }
          else {
            res.redirect('/users/login');
          };
        }
      })
    },

    Logout: function(req, res) {
      res.clearCookie('username')
      res.redirect('/')
    }
};

  module.exports = UsersController;
