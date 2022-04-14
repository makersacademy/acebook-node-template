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

module.exports = function() {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
}


// const { connect } = require('../../models/posts.js')

// module.exports = async (on, config) => {
//   const db = await connect()
//   const posts = db.collection('posts')

//   on('task', {
//     async clearPosts() {
//       console.log('clear posts')
//       await posts.remove({})

//       return null
//     },
//   })
// }