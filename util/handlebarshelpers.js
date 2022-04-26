const hbs = require("hbs")
const moment = require("moment")

hbs.registerHelper('dateFormat', function (date) {
  const formatToUse = "DD/MM/YYYY, H:mm"
  return moment(date).format(formatToUse);
});

hbs.registerHelper("dataImage", (img) => `data:${img?.contentType ?? ''};base64,${img?.data?.toString('base64')}`);
