const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const methodOverride = require("method-override");
const flash = require("express-flash")
const Handlebars = require('hbs');

const homeRouter = require("./routes/home");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
const sessionsRouter = require("./routes/sessions");
const usersRouter = require("./routes/users");
const imagesRouter = require("./routes/images");
const accountRouter = require("./routes/account");
const app = express();
var bodyParser = require('body-parser');


require('dotenv/config');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("/uploads", express.static(path.join(__dirname, "/public/uploads")));

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
    secret: "super_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);


// flash middleware
app.use(flash());

// middleware function to check for logged-in users
const sessionChecker = (req, res, next) => {
  if (!req.session.user) {
    req.session.signedIn = false;
  } else {
    req.session.signedIn = true;
  }
  next();
};
const signedOutRedirect = (req, res, next) => {
  if (req.session.signedIn === false) {

      res.redirect("/sessions/new");
  } else {
    next();
  }
};

const signedInRedirect = (req, res, next) => {
  if (req.session.signedIn === true) {
      res.redirect("/posts");
  } else {
    next();
  }
};


app.use(sessionChecker)
// route setup

app.use("/comments", commentsRouter);
app.use("/posts", signedOutRedirect, postsRouter);
app.use("/sessions", sessionsRouter);
app.use("/users", usersRouter);
app.use("/account", accountRouter);
app.use("/images", imagesRouter);
app.use("/", signedInRedirect, homeRouter);




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
