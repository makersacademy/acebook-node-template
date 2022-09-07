const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const methodOverride = require("method-override");

const homeRouter = require("./routes/home");
const postsRouter = require("./routes/posts");
const sessionsRouter = require("./routes/sessions");
const usersRouter = require("./routes/users");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use(
  session({
    key: "user_sid",
    secret: "super_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);

// clear the cookies after user logs out
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
  }
  next();
});


// const signUpChecker = (req, res, next) => {
//   next()
// }

// middleware function to check for logged-in users
// const sessionChecker = (req, res, next) => {
//   if (!req.session.user && !req.cookies.user_sid) {
//     res.redirect("/");
//   } else {
//     next();
//   }
// }

// check for logged in users
const loggedIn = (req) => {

  return req.session.user && req.cookies.user_sid;
};

// redirect '/posts' to '/' if not logged in
const redirPosts = (req, res, next) => {
  if (!loggedIn(req)) {
    res.redirect("/");
  } else {
    next();
  }
}

// redirect '/users/new' to '/posts' if logged in
const redirUsers = (req, res, next) => {
  if (loggedIn(req) && req.path == '/new') {
    res.redirect("/posts");
  } else {
    next();
  }
}


// redirect '/users/new' to '/posts' if logged in
const redirUsers = (req, res, next) => {
  if (loggedIn(req) && req.path == "/new") {
    res.redirect("/posts");
  } else {
    next();
  }
};

// redirect '/' to '/posts' if logged in
const redirHome = (req, res, next) => {
  if (loggedIn(req) && req.path == "/") {
    res.redirect("/posts");
  } else {
    next();
  }
};

// redirect '/' to '/posts' for logged-in users
const homeToPost = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {

// redirect '/' to '/posts' if logged in
const redirHome = (req, res, next) => {
  if (loggedIn(req) && req.path == '/') {

    res.redirect("/posts");
  } else {
    next();
  }

};

}


// route setup
// app.use("/posts", signUpChecker, postsRouter)
// app.use("/posts", sessionChecker, postsRouter);
app.use("/posts", redirPosts, postsRouter);
app.use("/sessions", sessionsRouter);
app.use("/users", redirUsers, usersRouter);
app.use("/", redirHome, homeRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

