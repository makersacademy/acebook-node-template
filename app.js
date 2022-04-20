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
 
const Post = require("./models/post");
const req = require("express/lib/request");
const run = require("nodemon/lib/monitor/run");

app.post('/unlike', async (req, res) => {
  //method for unliking the post in the database
  Post.findOneAndUpdate(
    { _id: req.body.postId },
    { $pull: { likes: req.body.username }},
    { new: true })

    //'executes' the query in the database
    .exec()
    
    .then(function(likes) {
      console.log("TEST: "+ JSON.stringify(likes));
  })

})

app.post('/like', async (req, res) => {
  //method for liking the post in the database
  Post.findOneAndUpdate(
    { _id: req.body.postId },
    { $push: { likes: [ req.body.username ]}},
    { new: true })

    //'executes' the query in the database
    .exec()

    .then(function(likes) {
      console.log("TEST: "+ JSON.stringify(likes));
  })
})

app.use(
  session({
    key: "user_sid",
    secret: "super_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 1000000,
    },
  })
);

// flash message middleware
app.use((req, res, next)=>{
  res.locals.message = req.session.message
  delete req.session.message
  next()
})

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
