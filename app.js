const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const methodOverride = require("method-override");
const multer = require('multer');

const homeRouter = require("./routes/home");
const postsRouter = require("./routes/posts");
const sessionsRouter = require("./routes/sessions");
const usersRouter = require("./routes/users");
const likesRouter = require("./routes/likes");
const imagesRouter = require('./routes/images');


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

// middleware function to check for logged-in users
const sessionChecker = (req, res, next) => {
  if (!req.session.user && !req.cookies.user_sid) {
    res.redirect("/sessions/new");
  } else {
    next();
  }
};

app.use((req, res, next) => {
  // if a user is in the session, make it available in the views
  if (req.session.user) {
    res.locals.user = req.session.user;
  }
  next();
});

app.post('/signup', async (req, res) => {
  try {
    if (req.body.password !== req.body.password2) {
      throw new Error("Passwords don't match. Try again.");
    }
    
    const user = new User(req.body);
    await user.save();
    // Rest of your sign-up logic...
  } catch (error) {
    res.status(400).send(error);
  }
});


// route setup
app.use("/", homeRouter);
app.use("/posts", sessionChecker, postsRouter);
app.use("/sessions", sessionsRouter);
app.use("/users", usersRouter);
app.use("/likes", likesRouter);
app.use('/images', imagesRouter);

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

//cloudinary
const port = 3001;


//setting up storage for images 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Set the file name to be unique
  }
});

const upload = multer({ storage: storage });

//creating a route to handle image uploads

app.get('/images', (req, res) => {
  // Render the desired page or send a response
  res.send('This is the images page');
});

app.post('/upload', upload.single('image'), (req, res) => {
  // Use the cloudinary.uploader.upload() method to upload the image
  cloudinary.uploader.upload(req.file.path, (error, result) => {
    if (error) {
      console.error(error);
      const message = 'Image upload failed';
      res.render('upload', { message }); // Pass the message to the template
    } else {
      console.log(result);
      const message = 'Image uploaded successfully';
      res.render('upload', { message }); // Pass the message to the template
    }
  });
});

module.exports = app;
