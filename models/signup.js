// var mongoose = require('mongoose');
// var userSchema = new mongoose.Schema({
//   firstname: String, 
//   secondname: String,
//   email: String,
//   password: String
// });
// var User = mongoose.model('myuser', userSchema);
// module.exports = User;


// username: {type:String, unique: true}

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10,
    
    UserSchema = new Schema({
    firstname: { type: String, required: true },
    secondname: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
});

UserSchema.pre('save', function(next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            // set the hashed password back on our user document
            user.password = hash;
            next();
        });
    });
});

var User = mongoose.model('myuser', UserSchema);
module.exports = User;