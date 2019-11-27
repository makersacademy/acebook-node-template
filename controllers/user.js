var User = require('../models/user');

var UserController  = {
    Create: function (req, res) {
        var user = new User(req.body)
        user.save(function(err) {
            if (err) {throw err; }
            res.send("success")
        });
    }
}
module.exports = UserController;