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
    },
    createTripWithCompanion() {
      Trips.create({ username: "Test", destination: 'Spain', companionEmails: ["123@gmail.com","456@gmail.com"], startDate: '10/05/2020', endDate: '11/05/2020' }, function (err) {
        if (err) return handleError(err);
        // saved!
      });
      return null;
    },
    createUser1() {
      User.create({ name: "Test", email: '123@gmail.com', password: 'password' }, function (err) {
        if (err) return handleError(err);
        // saved
      });
      return null;
  },
    createUser2() {
      User.create({ name: "Test2", email: '456@gmail.com', password: 'password2' }, function (err) {
        if (err) return handleError(err);
        // saved
      });
      return null;
  }
})
}
