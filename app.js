const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const methodOverride = require("method-override");
const hbs = require("hbs");

const homeRouter = require("./routes/home");
const postsRouter = require("./routes/posts");
const sessionsRouter = require("./routes/sessions");
const usersRouter = require("./routes/users");
const settingsRouter = require("./routes/settings");
const friendsRouter = require("./routes/friends");

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

// handlebar helper functions
hbs.handlebars.registerHelper("formatLikesNumber", function (likesNumber) {
  return likesNumber == 1 ? "1 like" : `${likesNumber} likes`;
});

hbs.handlebars.registerHelper("formatImage", function (type, data) {
  return `data:${type};base64,${data.toString("base64")}`;
});

hbs.handlebars.registerHelper("formatDate", function (dateObject) {
  let output = "";
  const time = dateObject;
  output +=
    time.getDate() +
    "-" +
    time.toLocaleString("default", { month: "short" }) +
    "-" +
    time.getFullYear();
  const minutes = (time.getMinutes() < 10 ? "0" : "") + time.getMinutes();
  output += " " + time.getHours() + ":" + minutes;
  return output;
});

//adds session to handlebars locals
app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});

// clear the cookies after user logs out
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
  }
  next();
});

// middleware function to check for logged-in users
const sessionChecker = (req, res, next) => {
  if (!req.session.user && !req.cookies.user_sid) {
    res.redirect("/sessions/new");
  } else {
    next();
  }
};

// route setup
app.use("/settings", sessionChecker, settingsRouter);
app.use("/", homeRouter);
app.use("/posts", sessionChecker, postsRouter); //sessionChecker used only for /posts
app.use("/sessions", sessionsRouter);
app.use("/users", usersRouter);
app.use("/friends", friendsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// // catch 422 and forward to error handler
// app.use((req, res, next) => {
//   next(createError(422));
// });

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
