var mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 

var UserSchema = new mongoose.Schema({
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

UserSchema.methods.hashedPassword = (password) => {
    return bcrypt.hashSync(password, 10)
}

UserSchema.methods.validPassword = function(password) { 
    return bcrypt.compareSync(password, this.password)
}


var User = mongoose.model('Users', UserSchema); // it creates new table, by changing 'users' to 'test' you are creating new table and any new data go to that table insead of 'users'. User is users
module.exports = User;

