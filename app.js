var createError = require('http-errors');
var express = require('express');
var path = require('path');
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var hbs = require("express3-handlebars");
var hbshelpers = require("handlebars-helpers");
var multihelpers = hbshelpers();

var homeRouter = require('./routes/home');
var postsRouter = require('./routes/posts');
var app = express();

var checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }

  next();
};


// view engine setup
/* app.set('views', path.join(__dirname, 'views')); */
app.engine(
  "hbs",
  hbs({
    helpers: multihelpers,
    partialsDir: ["views/partials"],
    extname: ".hbs",
    layoutsDir: "views",
    defaultLayout: "layout"
  })
);
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(checkAuth);
// route setup
app.use('/', homeRouter);
app.use('/posts', postsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
