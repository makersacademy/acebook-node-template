/* eslint-disable prefer-destructuring */
/* eslint-disable quotes */
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
const User = require("../../models/user");

module.exports = async (on) => {
  on("task", {
    async clearUsers() {
      mongoose.connect("mongodb://0.0.0.0/acebook_test", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await User.deleteMany({});

      return null;
    },
  });
};
