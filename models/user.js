var mongoose = require('mongoose');
//var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String }
});

var User = mongoose.model('User', UserSchema); // it creates new table, by changing 'users' to 'test' you are creating new table and any new data go to that table insead of 'users'.

module.exports = User;

//UserSchema.plugin(uniqueValidator);


// db => shows envoriment
// show dbs => shows db
// use <db> => switch db
// show collections => shows tables
// db.<table>.find() =>
// jo prepared the doc.

//
// username: {
//     type: String,
//     required: true,
//     // username is required to be filled in (can't not sign up)
//     unique: true,
//     // useful for sign-up in app -- every username has to be unique
//     trim: true,
//     // this trims off spaces at the end of the box - no excess space characters?
//     minlength: 3
//     // gives the username a minimum length for ultimate security.
// },
