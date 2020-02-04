var createError = require('http-errors'); //a module/gem that allows you throw errors
var express = require('express');  // A module which allows you to connect to the web, like sinatra
var path = require('path'); // A module which makes it easier to work with directories
var cookieParser = require('cookie-parser'); // Allows you to handle cookies on the web
var logger = require('morgan'); // Allows you to log get and post requests and errors to the console

var homeRouter = require('./routes/home'); // Path for the connection to the homepage
var postsRouter = require('./routes/posts'); // Path for the connection to the posts page

var app = express();  // so it's easier to call the express methods / functions

// view engine setup
app.set('views', path.join(__dirname, 'views'));  // Links the app.js to the views folder
app.set('view engine', 'hbs');  // Sets the view engine to Handlebars

// Middleware - middle part between the request and response to make it readable etc
app.use(logger('dev'));  // sets Logger to dev mode to return max info
app.use(express.json());  // takes data and converts it to json so it is readable by our program
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());  // allows the app to store session information
app.use(express.static(path.join(__dirname, 'public'))); // joins the app to the public folder

// route setup
app.use('/', homeRouter);  // sets up the route for the homepage
app.use('/posts', postsRouter); // sets up the route for the posts page, links to the variable that requires the route 

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
