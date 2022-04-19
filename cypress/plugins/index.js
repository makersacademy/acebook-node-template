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


mongoose.connect('mongodb://127.0.0.1/acebook_test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('open', function() {
  
});


module.exports = async (on) => {
  const users = db.collection('users')

  on('task', {
    async clearusers() {
      console.log('clear users')
      await users.remove({})

      return null
    },
  })
}