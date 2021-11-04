var User = require('../models/user');
var bcrypt = require("bcrypt")

var SessionsController = {
    New: function(req, res) {
        res.render('sessions/new', { title: "Log In" });
    },

    Create: function(req, res) {
        console.log('trying to log in')
        var email = req.body.email;
        var password = req.body.password;

        User.findOne({ email: email }).then(
            async(user) => {
                if (!user) {
                    return res.redirect('/sessions/new');
                }
                try {
                    if (await bcrypt.compare(password, user.password)) {
                        req.session.user = user;
                        res.redirect('/posts');
                    } else {
                        res.redirect('/sessions/new');
                    }
                } catch (err) {
                    res.status(500).send({ info: "error", message: "There was an error" });
                }
            }
        )
    },

    Destroy: function(req, res) {
        if (req.session.user && req.cookies.user_sid) {
            res.clearCookie('user_sid');
        }
        res.redirect('/');
    }
};

module.exports = SessionsController;