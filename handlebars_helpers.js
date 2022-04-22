const { ObjectId } = require("mongodb");
const hbs = require('hbs');

module.exports = function setup() {
    hbs.registerHelper("idtotime", id => {
        const timestamp = new ObjectId(id).getTimestamp()
    return `${timestamp.getHours()}:${timestamp.getMinutes()}, ${timestamp.getDate()}-${("0" + (timestamp.getMonth()+1)).slice(-2)}-${timestamp.getFullYear()}`})
    
}