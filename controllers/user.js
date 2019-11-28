var User = require('../models/user');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

// function validateEmailAccessibility(email){
//     return User.findOne({email: email}).then(function(result){
//          return result !== null;
//     });
//  }

var UserController  = {
    Create: function (req, res) {
        var form = req.body;
        var passwordHash = bcrypt.hashSync(form.password, salt);
        // if(validateEmailAccessibility(form.email)) {
        //     return;
        // } else {
            var user = new User({
                firstName: form.firstName,
                surname: form.surname,
                email: form.email,
                dob: form.dob,
                password: passwordHash
            });
            user.save(function(err) {
                if (err) {throw err; }
                res.send("success")
            });
        // }    
    }
}
module.exports = UserController;