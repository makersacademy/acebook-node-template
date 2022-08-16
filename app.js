const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const fs = require('fs');
// sets the session
const session = require("express-session");
const methodOverride = require("method-override");

const homeRouter = require("./routes/home");
const postsRouter = require("./routes/posts");
const sessionsRouter = require("./routes/sessions");
const usersRouter = require("./routes/users");
const friendsRouter = require("./routes/friends");
const imgModel = require('./models/image');

const multer = require('multer');

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
  // the below is called request body, session view
  session({
    key: "user_sid", // key that will sign cookie
    secret: "super_secret",
    resave: false, // for every request to the server we want to create a new cookie
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);


// --------IMAGE FUNCTIONALITY START--------------

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + ".png")
  }
});

const upload = multer({ storage: storage });

// Step 7 - the GET request handler that provides the HTML UI

app.get('/image', async (req, res) => {
  const img = await imgModel.find({ userId: req.session.user._id });
  console.log("img object", img)
  res.render('users/image-test', { img: img });
});


app.post('/image', upload.single('image'), (req, res, next) => {
  console.log("req file print", req.file)
  const obj = {
    userId: req.session.user._id,
    name: req.body.name,
    desc: req.body.desc,
    imgPath: path.join(__dirname + '/uploads/' + req.file.filename),
    profile: true,
    // data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
    // contentType: 'image/png'

  }
  imgModel.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    }
    else {
      // item.save();
      res.redirect('/image');
    }
  });
});

// --------IMAGE FUNCTIONALITY END--------------


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
app.use("/", homeRouter);
app.use("/posts", sessionChecker, postsRouter);
app.use("/sessions", sessionsRouter);
app.use("/users", usersRouter);
app.use("/friends", friendsRouter);

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
