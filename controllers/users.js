var User = require('../models/user');

var UsersController = {
    New: function(req, res) {
        res.render('users/new', {});
    },

    Create: function(req, res) {
        var user = new User(req.body);
        User.findOne({ email: user.email }).then(
            (userReturned) => {
                if (userReturned) {
                    res.status(400).redirect('/sessions/new');
                } else {
                    user.save(function(err) {
                        if (err) {
                            throw err;
                        }
                        res.status(201).redirect('/posts');
                    });

                }

            }
        )

    }
};

module.exports = UsersController;