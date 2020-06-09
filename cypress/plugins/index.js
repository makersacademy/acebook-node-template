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
var User = require('../../models/user');
var bcrypt = require('bcrypt');


module.exports = function(on) {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task', {
    insertUser(userInformation) {
      return new Promise(function(resolve) {
        mongoose.connect('mongodb://localhost/acebook_test', function(err) {
          bcrypt.hash(userInformation.password, 10, function(err, hash) {
            userInformation.password = hash;
            var newUser = new User(userInformation);
            newUser.save(function(err) {
              console.log('I got into the database as Lomothy Mockins!')
              resolve('done');
            }); 
          });
        });
      });
    }
  });
}
