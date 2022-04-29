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
const sessionChecker = require("./util/sessionchecker");
require("./util/handlebarshelpers");
const MongoStore = require("connect-mongo");
const mongoConnector = require("./util/mongoConnector");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
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
      store: MongoStore.create({
        clientPromise: mongoConnector.connection.then(m => m.connection.getClient())
      })
    })
);

app.use((req, res, next) => {
  res.locals.user = req.session.user
  next();
});


// clear the cookies after user logs out
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
  }
  next();
});


// route setup
app.use("/", homeRouter);
app.use("/posts", sessionChecker, postsRouter);
app.use("/sessions", sessionsRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// we need the `next` there otherwise express ignores the whole handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.status = err.status;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;