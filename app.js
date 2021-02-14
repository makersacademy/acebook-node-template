const express = require('express'); // require express
const path = require('path'); // provides the utility to with files and directory paths
const createError = require('http-errors'); // creates HTTP errors
const cookieParser = require('cookie-parser'); // enables signed cookie support
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');

// connect to express
const app = express();

// set up sessions
app.use(session({
  secret: 'secret-session',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 1000 * 60 * 60 * 24}
}))

// connect to the routes folder
const homeRouter = require('./routes/home'); // gets the home page
const dashboardRouter = require('./routes/dashboard'); // gets the content page

app.use(express.static(path.join(__dirname, 'public'))); // tell express where our public files are which are our css, images, etc

// setup view engine to use hbs in the views folder
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

// tell express to use these route
app.use('/', homeRouter);
app.use('/dashboard', dashboardRouter);

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



module.exports = app; // export the app so routes can access it
