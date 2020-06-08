var mongoose = require('mongoose');
//var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
    firstName: {
         type: String 
        },
    lastName: { 
        type: String 
        },
    email: {
        type: String,
        unique: true,
        },
    password: {
        type: String 
    },
});

var User = mongoose.model('Users', UserSchema); // it creates new table, by changing 'users' to 'test' you are creating new table and any new data go to that table insead of 'users'. User is users
module.exports = User;

