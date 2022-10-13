const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const methodOverride = require("method-override");
const multer = require("multer");
const hbs = require("hbs");

const Image = require("./models/image");

const homeRouter = require("./routes/home");
const postsRouter = require("./routes/posts");
const sessionsRouter = require("./routes/sessions");
const usersRouter = require("./routes/users");
const uploadRouter = require("./routes/upload");

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

//revise use of handlebars helper functions
hbs.handlebars.registerHelper("toStringFromBase64", function (data) {
  return data.toString("base64");
});

// storage for multer
const Storage = multer.diskStorage({
  destination: "public/uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer().single("uploadedImage");
// storage: Storage,

//eventually move this inside the controller & route!
// image upload
app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      // const correctFilePath = req.file.path.slice("public".length);
      const newImage = new Image({
        // name: Date.now() + req.body.name,
        // name: req.body.textNote  // save content of text note curretly unused
        name: req.body.textNote, // TODO currently used for displaying the image
        data: {
          data: req.file.buffer, //here we shoudl save req.file.buffer
          contentType: req.file.mimetype,
        },
        contentType: req.file.mimetype,
      });
      console.log(req.file);
      newImage
        .save()
        .then(() => res.send("successfully uploaded"))
        .catch((err) => console.log(err));
    }
  });
});

// route setup
app.use("/upload", uploadRouter);
app.use("/", homeRouter);
app.use("/posts", sessionChecker, postsRouter); //sessionChecker used only for /posts
app.use("/sessions", sessionsRouter);
app.use("/users", usersRouter);

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
