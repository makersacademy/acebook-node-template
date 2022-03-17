// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

var mongoose = require('mongoose');
var User = require("../../models/user");
var Post = require("../../models/post");

module.exports = (on, config) => {
  on('task', {
    async 'resetDb'() {
     
      mongoose.connect('mongodb://127.0.0.1/acebook_test', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    
      let db = mongoose.connection;

      db.on('error', console.error.bind(console, 'MongoDB connection error:'));

      //open is Emitted after 'connected' and 'onOpen' is executed on all of this connection's models.
      // It means we can now work against these models on the database
      // https://mongoosejs.com/docs/connections.html
      db.on('open', function() {

        User.deleteMany({}).then( () => {
          console.log("User Test Data Deleted");
        }).catch(function(error){
          console.log(error); 
        });

        Post.deleteMany({}).then(function(){
          console.log("Post Test Data Deleted");
        }).catch(function(error){
          console.log(error); 
        });

      });      
      return null
    },
  })

  on('task', {
    async 'closeDbConnection'() {
      mongoose.connection.close(() => {
        console.log("Database Connection Closed");
      });

      return null
    } 
  })


}