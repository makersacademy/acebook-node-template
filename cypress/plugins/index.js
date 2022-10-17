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

const mongoose = require("mongoose");

// original template code
// module.exports = function () {
//   // `on` is used to hook into various events Cypress emits
//   // `config` is the resolved Cypress config
// };

module.exports = (on) => {
  on("task", {
    emptyPosts() {
      mongoose.connect("mongodb://0.0.0.0/acebook_test");
      const result = mongoose.connection.collection("posts").deleteMany({});
      return result;
    },
  });

  on("task", {
    emptyUsers() {
      mongoose.connect("mongodb://0.0.0.0/acebook_test");
      const result = mongoose.connection.collection("users").deleteMany({});
      return result;
    },
  });
};
