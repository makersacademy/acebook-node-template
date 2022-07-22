const Handlebars = require('handlebars');
const moment = require('moment');

module.exports = {
  ifeq: function(a, b, options){
    if (a === b) {
      return options.fn(this);
      }
    return options.inverse(this);
  },
  bar: function(){
    return "BAR!";
  },
  formatDate: function(date){
    return new Handlebars.SafeString(
      moment(date).format("MMM D").toUpperCase()
    )
  }
}