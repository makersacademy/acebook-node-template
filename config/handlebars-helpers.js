const Handlebars = require('handlebars');
const moment = require('moment');

module.exports = {
  formatDate: function(date){
    return new Handlebars.SafeString(
      moment(date).format("DD MMM YYYY HH:MM:SS ").toUpperCase()
    )
  }
}