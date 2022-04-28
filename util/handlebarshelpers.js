const hbs = require("hbs");
const moment = require("moment");
const {ObjectId} = require("mongodb");
// handlebars helper to check for object presence in array
hbs.registerHelper("contains", function (value, array, options) {
    return options[array.includes(value) ? "fn" : "inverse"](this);
});

hbs.registerHelper("containsId", function (value, array, options) {
    return options[array.some(x => x.toString() === value.toString()) ? "fn" : "inverse"](this);
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

hbs.registerHelper("toString", it => it.toString())

const DEFAULT_IMAGE = `
data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDggNTEyIj48IS0tISBGb250IEF3ZXNvbWUgUHJvIDYuMS4xIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlIChDb21tZXJjaWFsIExpY2Vuc2UpIENvcHlyaWdodCAyMDIyIEZvbnRpY29ucywgSW5jLiAtLT48cGF0aCBkPSJNMjI0IDI1NmM3MC43IDAgMTI4LTU3LjMxIDEyOC0xMjhzLTU3LjMtMTI4LTEyOC0xMjhDMTUzLjMgMCA5NiA1Ny4zMSA5NiAxMjhTMTUzLjMgMjU2IDIyNCAyNTZ6TTI3NC43IDMwNEgxNzMuM0M3Ny42MSAzMDQgMCAzODEuNiAwIDQ3Ny4zYzAgMTkuMTQgMTUuNTIgMzQuNjcgMzQuNjYgMzQuNjdoMzc4LjdDNDMyLjUgNTEyIDQ0OCA0OTYuNSA0NDggNDc3LjNDNDQ4IDM4MS42IDM3MC40IDMwNCAyNzQuNyAzMDR6IiBmaWxsPSIjNzY5RkNEIi8+PC9zdmc+
`

hbs.registerHelper("dataImage", (img) => img?.data ?
    `data:${img?.contentType ?? ''};base64,${img?.data?.toString('base64')}` :
    DEFAULT_IMAGE);

hbs.registerHelper("strEq", function (one, two, options) {
    return options[one?.toString() === two?.toString() ? "fn" : "inverse"](this)
});