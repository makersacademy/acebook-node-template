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

const mongoose = require('mongoose');

// the below four lines are commented out to test the mongoose drop function.
// module.exports = function() {
//   // `on` is used to hook into various events Cypress emits
//   // `config` is the resolved Cypress config
// }

module.exports = async (on, config) => {
  on('task', {
      async emptyPosts() {
        var con = mongoose.connect("mongodb://0.0.0.0/acebook_test");
        console.log(`con: ${con}`)
        console.log(`mongoose.connection: ${mongoose.connection}`)
        mongoose.connection.on('open', function(){
            mongoose.dropCollection(function(err, result){
              console.log(err);
              console.log(result);
            });
        })
      }
  })
}

// afterEach(async function () {
//   const collections = await mongoose.connection.db.collections()

//   for (let collection of collections) {
//     await collection.remove()
//   }
// })



// mongoose.connection.collections.posts.drop

// mongoose.connect("mongodb://0.0.0.0/acebook_test", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   var db = mongoose.connection;
//   db.on("error", console.error.bind(console, "MongoDB connection error:"));
//   db.on("open", function () {
//     done();
//   });