var User = require('../models/user');
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
    LogOut: function(req, res) {
        if (req.cookies.userId) {
            res.clearCookie("userId")
        }
        res.redirect("/")
    },
    Profile: function (req, res) {
        User.findOne({_id: req.params.id}, function(err, user){
            if (err) {throw err;}
            if (user) {
                res.render("user/profile", user)
            }
        })
    }
}

module.exports = UserController;