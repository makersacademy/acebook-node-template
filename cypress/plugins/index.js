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

// module.exports = function() {
//   // `on` is used to hook into various events Cypress emits
//   // `config` is the resolved Cypress config
// }

// var mongoose = require("mongoose");
// require("../../spec/mongodb_helper");
//

const User = require("../../models/user")
const Comment = require("../../models/comment")
const Post = require("../../models/post")

const mongoose = require("mongoose");

module.exports = (on) => {
    on('task', {
        'wipe_database': async () => {
            console.log("hello world");
            mongoose.connect("mongodb://0.0.0.0/acebook_test", {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            await Post.deleteMany({});
            await User.deleteMany({});
            await Comment.deleteMany({});
            return null
        },
    })
}
