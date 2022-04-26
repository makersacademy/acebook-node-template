/* eslint node/no-unpublished-require: "off" */
const mongo = require('cypress-mongodb');

module.exports = (on) => {
  mongo.configurePlugin(on);
}