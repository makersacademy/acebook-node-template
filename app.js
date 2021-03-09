var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');

var homeRouter = require('./routes/home');
var postsRouter = require('./routes/posts');
var signupRouter = require('./routes/signup');
<<<<<<< HEAD
var signinRouter = require('./routes/signin');
=======
>>>>>>> 8f47b83b4b1c8a263d1297d7738e2a255aefaf4b
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))

// route setup
app.use('/', homeRouter);
app.use('/posts', postsRouter);
app.use('/signup',signupRouter);
<<<<<<< HEAD
app.use('/signin',signinRouter);
=======
>>>>>>> 8f47b83b4b1c8a263d1297d7738e2a255aefaf4b

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
