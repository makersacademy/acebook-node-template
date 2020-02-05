const bcrypt = require('bcrypt')
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

            
            users.save(function(err) { // saves the new post
                if (err) { throw err; } 
                
                res.status(201).redirect('/users/login');      // if it works show you the list of posts 
        
            });

        } else { 
                // document.getElementById('demo').innerHTML = "You have entered the wrong password!";
            //     popupS.window({
            //         mode: 'alert',
            //         content: "Your password did not Match"
            //     });  
                res.redirect('users/register');
            } 
    
    
    },
    
    Login: function(req, res) {
      res.render('users/login', {});  // render the user index view folder
    },
     
};

  module.exports = UsersController;