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
var Post = require('../../models/post');

module.exports = function(on) {

  on('task', {
    myAsyncTask() {
      console.log("Inside the AysncTask");
      return new Promise(function(resolve) {
        mongoose.connect('mongodb://localhost/acebook_test', function(err) {
          var newPost = new Post({body: 'I met a lovely dog today'});
          newPost.save(function(err) {
           
            
            resolve('done');
          });
        });
      });
    }




  });
}