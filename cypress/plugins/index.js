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
mongoose.connect('mongodb://localhost/chipmunk_test', {
   useNewUrlParser: true,
   useUnifiedTopology: true
})

var Trips = require('../../models/trips');
var User = require('../../models/user');



module.exports = (on) => {
  on('task', {
    resetDB() {
      User.deleteMany({}, function () {
      });
      Trips.deleteMany({}, function () {
      });
      return null;
    }
  })
}
