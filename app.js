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
const expressHbs =  require('express-handlebars');


const app = express();

app.engine('.hbs', expressHbs.engine({ defaultLayout: 'layout', extname: '.hbs',runtimeOptions: {
  allowProtoPropertiesByDefault: true,
  allowProtoMethodsByDefault: true
} }))

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

const hbs = expressHbs.create({});

//Date format helper
hbs.handlebars.registerHelper('formatDate', function(posts) {
    const options = { weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric' };
    const formattedDate = posts.date.toLocaleDateString('en-US', options);
    return formattedDate;
});

//A simple helper to determine whether there has been one 'like' or multiple 'likes'
hbs.handlebars.registerHelper('if_equal', function(posts) {
  if (posts.like.length === 1) {
  return "like";
  } else {
  return "likes";
}
});

//Like button helper this checks if the session user has liked a post and if so displays the like
// button with a coloured spade if not displays the like button with a blank spade 
// hbs.handlebars.registerHelper('likeButton', function(posts) {
//   if (posts.like.length === 1) {
//   return "like";
//   } else {
//   return "likes";
// }
// });



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

// middleware function to check for logged-in users
const sessionChecker = (req, res, next) => {
  if (!req.session.user && !req.cookies.user_sid) {
    res.redirect("/sessions/login");
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
