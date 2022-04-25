const { ObjectId } = require("mongodb");
const hbs = require('hbs');

module.exports = function setup() {
    hbs.registerHelper("idtotime", id => {
        const timestamp = new ObjectId(id).getTimestamp()
    return `${timestamp.getHours()}:${timestamp.getMinutes()}, ${timestamp.getDate()}-${("0" + (timestamp.getMonth()+1)).slice(-2)}-${timestamp.getFullYear()}`})
    
    hbs.registerHelper("contains", (a, b, options) => {
        b = (b instanceof Array) ? b : [b];
        return options[b.includes(a) ? "fn" : "inverse"](this);
    })

    hbs.registerHelper({
        eq: (v1, v2) => v1 === v2,
        gt: (v1, v2) => v1 > v2 });
}
