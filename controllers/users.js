var User = require('../models/user');
var bcrypt = require("bcrypt");

var UsersController = {
    New: function(req, res) {
        res.render('users/new', { title: "Sign Up" });
    },

    Create: async function(req, res) {

        var userInfo = {...req.body };
        var hashedPassword = await bcrypt.hash(userInfo.password, 10);
        userInfo.password = hashedPassword;
        // console.log(hashedPassword);

        var user = new User(userInfo);

        User.findOne({ email: user.email }).then(
            (userReturned) => {
                if (userReturned) {
                    req.session.message = {
                        type: "danger",
                        intro: "User already exists!",
                        message: "If you already have an account, please sign in."
                    }
                    res.status(400).redirect('/sessions/new');

                } else {
                    user.save(function(err) {
                        if (err) {
                            throw err;
                        }
                        req.session.message = {
                            type: "success",
                            intro: `Welcome, ${user.name}!`,
                            message: "Enjoy your time at Acebook Pandas!"
                        }
                        req.session.user = user;
                        res.status(201).redirect('/posts');
                    });

                }

            }
        )

    }
};

module.exports = UsersController;