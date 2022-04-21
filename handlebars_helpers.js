const { ObjectId } = require("mongodb");
const hbs = require('hbs');

module.exports = function setup() {
    hbs.registerHelper("idtotime", id => new ObjectId(id).getTimestamp().toString())
}