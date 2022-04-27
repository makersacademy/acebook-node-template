const hbs = require("hbs");
const moment = require("moment");
const {ObjectId} = require("mongodb");
// handlebars helper to check for object presence in array
hbs.registerHelper("contains", function (value, array, options) {
  // fallback...
  array = (array instanceof Array) ? array : [array];
  return options[array.includes(value) ? "fn" : "inverse"](this);
});

// handlebars helper to check for posted image
hbs.registerHelper("tob64", function (value) {
  return value.toString("base64");
});

// handlebars helper to give post a timestamp
hbs.registerHelper("id-to-timestamp", function (value) {
  const timeStamp = new ObjectId(value).getTimestamp()
  return moment(timeStamp).fromNow()
});

hbs.registerHelper("dataImage", (img) => `data:${img?.contentType ?? ''};base64,${img?.data?.toString('base64')}`);

hbs.registerHelper("strEq", function (one, two, options) {
  return options[one?.toString() === two?.toString() ? "fn" : "inverse"](this)
});