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
    All: async function(req, res) {

        const loggedInUser = await User.findOne({_id: req.cookies.userId }, function(err, user) {
            if(err) {throw err; }
            if(user) {
                return user;
            }
        })
        User.find({}, function(err, users) {
            if(err) {throw err; }
            if(users) {
                var checkedUsers =  users.map(function(user) {
                    return {
                    user,
                    isFriends: user.friends.includes(req.cookies.userId),
                    isSelf: user.id === req.cookies.userId,
                    }
                })
                console.log(checkedUsers)
                res.render("user/all", { loggedInUser, checkedUsers });
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
        const loggedInUser = await User.findOne({_id: req.cookies.userId }, function(err, user) {
            if(err) {throw err; }
            if(user) {
                return user;
            }
        })
        
        let findUser = await User.findOne({_id: req.params.id}, function(err, user){
            if (err) {throw err;}
            if (user) {
                return user
            }
        })

        let findUserPosts = await Posts.find({userId: req.params.id}, function(err, posts){
            if (err) {throw err;}
            if (posts) {
                return posts
            }
        })
        var isFriends = findUser.friends.includes(req.cookies.userId);
        var isSelf = req.params.id ===req.cookies.userId;
        res.render("user/profile", { 
            loggedInUser: loggedInUser,
            user: findUser,
            posts: findUserPosts,
            isFriends: isFriends,
            isSelf: isSelf,
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
    GetFriends: function(req, res) {
        if(!req.cookies.userId) {
            res.redirect ("/")
        }
        User.findOne({_id: req.cookies.userId })
                        .populate({
                            path: 'friends',
                            model: 'User'
                        }).exec(function(err, docs) {
                            if(err) { throw err}
                            res.render('user/friends', {user:docs})
                        });
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
                            if(err) { throw err}
                            res.render('user/requests', {user:docs})
                        });
    },
    AcceptFriendRequest: async function(req, res) {
        if(!req.cookies.userId) {
            res.redirect ("/")
        }

        let pullRequest = await User.updateOne({_id: req.cookies.userId}, { $pull: { friendRequests: req.params.id }})
        let pushRequest = await User.updateOne({_id: req.cookies.userId}, { $push: { friends: req.params.id }})
        let pushRequest2 = await User.updateOne({_id: req.params.id}, {$push: {friends: req.cookies.userId }})
        pullRequest;
        pushRequest;
        pushRequest2;

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