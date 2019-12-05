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
                res.render("user/all", { users });
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
    },
    AddFriend: function(req, res) {
        if(!req.cookies.userId) {
            res.redirect ("/")
        }
        User.update({_id: req.body.userId}, {
            $push: {
                friendRequests: req.cookies.userId
            }
        }).exec(function(err, user){
            res.redirect(`/user/${req.body.userId}`)
        })
    },
    GetFriendRequests: function(req, res) {
        if(!req.cookies.userId) {
            res.redirect ("/")
        }
        User.findOne({_id: req.cookies.userId })
                        .populate({
                            path: 'friendRequests',
                            model: 'User'
                        }).exec(function(err, docs) {
                            res.render('user/requests', {user:docs})
                        });
    },
    AcceptFriendRequest: async function(req, res) {
        if(!req.cookies.userId) {
            res.redirect ("/")
        }

        let pullRequest = await User.updateOne({_id: req.cookies.userId}, { $pull: { friendRequests: req.params.id }})
        let pushRequest = await User.updateOne({_id: req.cookies.userId}, { $push: { friends: req.params.id }})

        pullRequest;
        pushRequest;

        res.redirect("/user/requests")

    },
    DeclineFriendRequest: function(req, res) {
        if(!req.cookies.userId) {
            res.redirect ("/")
        }
        User.update({_id: req.cookies.userId}, {
            $pull: {
                friendRequests: req.params.id
            }
        }).exec(function(err, user){
            res.redirect('/user/requests')
        })
    }
}

module.exports = UserController;