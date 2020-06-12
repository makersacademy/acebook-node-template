var mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 

var userSchema = new mongoose.Schema({
    firstName: {
         type: String 
        },
    lastName: { 
        type: String 
        },
    email: {
        type: String,
        },
    password: {
        type: String 
    },
});

userSchema.methods.hashedPassword = (password) => {
    return bcrypt.hashSync(password, 10)
}

userSchema.methods.validPassword = function(password) { 
    return bcrypt.compareSync(password, this.password)
}


var user = mongoose.model('Users', userSchema); 
module.exports = user;

