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

var mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0/acebook_test", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = async (on) => {
  const db = await mongoose.connection;
  const users = db.collection("users");
  const posts = db.collection("posts");

  on("task", {
    async dropUsers() {
      const numUsers = await users.countDocuments();
      if (numUsers > 0) {
        await users.drop();
      } else {
        console.log('No User collections to drop!');
      }
      return null;
    }, async dropPosts() {
      const numPosts = await posts.countDocuments();
      if (numPosts > 0) {
        await posts.drop();
      } else {
        console.log('No Post collections to drop!')
      }
      return null;
    },
  });
}
