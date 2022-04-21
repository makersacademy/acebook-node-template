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
const User = require("./models/user");
const req = require("express/lib/request");
const run = require("nodemon/lib/monitor/run");

app.post('/acceptFriendRequest', async (req, res) => {
  //accept a friend request that's been sent to you
  
  //delete the friend request from their sent requests array
  console.log('you accepted a friend request start');
  console.log(req.body.sessionUsername)
  console.log(req.body.username)
  console.log('end')
  User.findOneAndUpdate(
  { username: req.body.request},
  { $pull: {sentRequests: req.body.sessionUsername}},
  { new: true })
  .exec()
//add your name to the request senders friends list
  User.findOneAndUpdate(
    { username: req.body.request},
    { $push: {friendsList: [req.body.sessionUsername]}},
    { new: true })
    .exec()

  //delete the friend request from their received requests array
  User.findOneAndUpdate(
  { username: req.body.request},
  { $pull: {receivedRequests: req.body.request}},
  { new: true })
  .exec()
//add the name of the person who sent a friend request to your friends
  User.findOneAndUpdate(
    { username: req.body.sessionUsername},
    { $push: {friendsList: [req.body.request]}},
    { new: true })
    .exec()

});
app.post('/sendFriendRequest', async (req, res) => {
  //add username of the friend to your friend requests sent
  console.log('you added a friend');
  console.log(req.body.sessionUsername)
  console.log(req.body.username)
  User.findOneAndUpdate(
  { username: req.body.sessionUsername},
  { $push: {sentRequests: [req.body.username]}},
  { new: true })
  .exec()

  User.findOneAndUpdate(
    { username: req.body.username},
    { $push: {receivedRequests: [req.body.sessionUsername]}},
    { new: true })
    .exec()



//   .then(function(friend) {
//     console.log("sent test: "+ JSON.stringify(friend));
// })
//add username to the receivers received friend requests array
// User.findOneAndUpdate(
//   {  username: req.body.username},
//   {$push: {receivedRequests: [ req.body.username]}},
//   { new: true })
//   .exec()
//   .then(function(friend) {
//     console.log("received test: "+ JSON.stringify(friend));
// })

});
  


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
    sameSite: false
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
