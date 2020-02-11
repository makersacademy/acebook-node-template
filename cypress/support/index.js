// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
// import './commands'

// Alternatively you can use CommonJS syntax:
require('./commands')

// var mongoose = require('mongoose');

// beforeEach(function(done) {
//   var mongoose = mongoose.connect('mongodb://localhost/acebook', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   });

//   var db = mongoose.connection;
//   db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//   db.on('open', function() {
//     done();
//   });
//   mongoose.connection.collections.users.drop(function() {
//       done();
//   })
// });


