var createError = require('http-errors');
var express = require('express');
var path = require('path');
const fileUpload = require('express-fileupload');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');

var homeRouter = require('./routes/home');
var postsRouter = require('./routes/posts');
var sessionsRouter = require('./routes/sessions');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(
  fileUpload({
    limits: { fileSize: 1024 * 1024 }
  })
);

app.use(
  session({
    key: 'user_sid',
    secret: 'super_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: null // 600000
    }
  })
);

// clear the cookies after user logs out
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
});

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
  if (
    req.session === undefined ||
    req.session.user === undefined ||
    (!req.session.user && !req.cookies.user_sid)
  ) {
    res.redirect('/sessions/new');
  } else {
    next();
  }
};

// flash middleware
app.use(function (req, res, next) {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

// middleware to check if a user is logged in
app.use(function (req, res, next) {
  res.locals.userExists = req.session.user ? true : false;
  next();
});

// route setup
app.use('/', homeRouter);
app.use('/posts', sessionChecker, postsRouter);
// app.use("/posts", postsRouter);
app.use('/sessions', sessionsRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
