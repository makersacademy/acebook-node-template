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

module.exports = function() {
  
}

//
//const mongoose = require('mongoose');
//
//module.exports = (on) => {
//  on('task', {
//    async clearDb() {
//      await mongoose.connect('mongodb://0.0.0.0/acebook_test');
//      await mongoose.connection.db.dropDatabase();
//      await mongoose.connection.close();
//      return null;
//    }
//  });
//};
//
