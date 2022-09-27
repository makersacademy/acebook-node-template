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

//Adding bodyParser for image upload
//const bodyParser = require('body-parser');
const multer = require("multer");

//Adding in Multer for image upload

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

console.log("hello!");
console.log(storage);

const upload = multer({ storage: storage });

//-------------end of image upload code ----------
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
// Set EJS as templating engine for image view requirement
//app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app use functions for upload
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

// set up EJS EJS is specifically designed for building single-page,
// multi-page, and hybrid web applications
//app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.json())

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

// middleware function to check for logged-in users
const sessionChecker = (req, res, next) => {
  if (!req.session.user && !req.cookies.user_sid) {
    res.redirect("/sessions/new");
  } else {
    next();
  }
};

app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  next();
});

// route setup
app.use("/", homeRouter);
app.use("/posts", sessionChecker, postsRouter);
app.use("/sessions", sessionsRouter);
app.use("/users", upload.single("image"), usersRouter);
//app use functions for image upload
//app.use(express.static(__dirname + '/public'));
//app.use('/images', express.static('uploads'));

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
