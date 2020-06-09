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
    insertLomothy() {
      return new Promise(function(resolve) {
        mongoose.connect('mongodb://localhost/acebook_test', function(err) {
          var password = '12345';
          bcrypt.hash(password, 10, function(err, hash) {
            var newUser = new User({firstName: 'Lomothy', lastName: 'Mockins', email: 'Lomothy.Tomins@example.com', password: hash});
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
