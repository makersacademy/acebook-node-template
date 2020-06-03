var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
}); 

var User = mongoose.model('User', UserSchema); // it creates new table, by changing 'users' to 'test' you are creating new table and any new data go to that table insead of 'users'. 

module.exports = User;


// db => shows envoriment
// show dbs => shows db
// use <db> => switch db
// show collections => shows tables
// db.<table>.find() => 
// jo prepared the doc.