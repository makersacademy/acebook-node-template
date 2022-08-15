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

  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  let mongoose = require("mongoose");
  mongoose.connect("mongodb://0.0.0.0/acebook_test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  module.exports = async (on) => {
    const db = await mongoose.connection;
    const posts = db.collection("posts");
    const users = db.collection("users");
    on("task", {
      async dropPosts() {
        await posts.drop();
        return null;
      },
    }),
      on("task", {
        async dropUsers() {
          await users.drop();
          return null;
        },
      });
  };

