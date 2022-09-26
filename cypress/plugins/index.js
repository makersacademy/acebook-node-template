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

const mongoose = require('mongoose')

module.exports = async (on, config) => {
  on('task', {
    async emptyPosts() {
      // this is a new task that cypress understands, to delete the posts from the db
      var con = mongoose.connect("mongodb://0.0.0.0/acebook_test");
      const result = mongoose.connection.collection('posts').deleteMany({});
      return result;
    }
  })

  on('task', {
    async emptyUsers() {
      // this is a new task that cypress understands, to delete the users from the db
      var con = mongoose.connect("mongodb://0.0.0.0/acebook_test");
      const result = mongoose.connection.collection('users').deleteMany({});
      return result;
    }
  })

  on('task', {
    async emptyComments() {
      // this is a new task that cypress understands, to delete the users from the db
      var con = mongoose.connect("mongodb://0.0.0.0/acebook_test");
      const result = mongoose.connection.collection('comments').deleteMany({});
      return result;
    }
  })
}