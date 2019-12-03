var User = require('../models/user');
var Posts = require('../models/post');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

var UserController  = {
    Create: function (req, res) {
        var form = req.body;
        var passwordHash = bcrypt.hashSync(form.password, salt);
        User.findOne({email: form.email}, function (err, docs) {
            if (err) { throw err; }
            if (docs){
                res.send("Error. User already exists")
            } else{
                var user = new User({
                    firstName: form.firstName,
                    surname: form.surname,
                    email: form.email,
                    dob: form.dob,
                    password: passwordHash
                });
                user.save(function(err, user) {
                    if (err) {throw err; }
                    res.cookie("userId", user.id)
                    res.redirect("/posts")
                });
            }
        }) 
    },

    Index: function(req, res) {
        var form = req.body;
        User.findOne({email: form.email }, function(err, user) {
          if (err) { throw err; }
          if(user) {
            if(bcrypt.compareSync(form.password, user.password)) {
                res.cookie('userId', user.id);
                res.redirect("/posts");
            } else {
                res.redirect("/");
            }
          }
        });
    },

    All: function(req, res) {
        User.find({}, function(err, users) {
            if(err) {throw err; }
            if(users) {
                res.render("users/all", { users });
            }
        });
    
    },

    LogOut: function(req, res) {
        if (req.cookies.userId) {
            res.clearCookie("userId")
        }
        res.redirect("/")
    },
    Profile: async function (req, res)  {
        let findUser = User.findOne({_id: req.params.id}, function(err, user){
            if (err) {throw err;}
            if (user) {
                return user
            }
        })

        let findUserPosts = Posts.find({userId: req.params.id}, function(err, posts){
            if (err) {throw err;}
            if (posts) {
                return posts
            }
        })

        res.render("user/profile", { 
            user: await findUser,
            posts: await findUserPosts
        })
    }
}

module.exports = UserController;