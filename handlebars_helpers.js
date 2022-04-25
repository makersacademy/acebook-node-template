const { ObjectId } = require("mongodb");
const hbs = require('hbs');

module.exports = function setup() {
    hbs.registerHelper("idtotime", id => {
        const timestamp = new ObjectId(id).getTimestamp()
    return `${("0" + (timestamp.getHours())).slice(-2)}:${("0" + (timestamp.getMinutes())).slice(-2)}, ${timestamp.getDate()}-${(
      "0" + (timestamp.getMonth() + 1)
    ).slice(-2)}-${timestamp.getFullYear()}`;
    })

    hbs.registerHelper('eq', function(v1, v2, options) {
      if(v1 === v2) {
        return options.fn(this);
      }
      return options.inverse(this);
    });
};
