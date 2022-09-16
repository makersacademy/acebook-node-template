const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const methodOverride = require("method-override");
const fileUpload = require("express-fileupload");

const homeRouter = require("./routes/home");
const postsRouter = require("./routes/posts");
const sessionsRouter = require("./routes/sessions");
const usersRouter = require("./routes/users");
const friendsRouter = require("./routes/friends");
const profilesRouter = require("./routes/profiles");
const adminRouter = require("./routes/admin");
const likesRouter = require("./routes/likes");
const commentsRouter = require("./routes/comments");

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
app.use(fileUpload());


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
		res.redirect("/");
	} else {
		next();
	}
};

// set a loggedIn variable
app.use((req, res, next) => {
	if (!req.session.user && !req.cookies.user_sid) {
		res.locals.loggedIn = false;
	} else {
		res.locals.loggedIn = true;
	}
	next();
});

// route setup
app.use("/", homeRouter);
app.use("/posts", sessionChecker, postsRouter);
app.use("/sessions", sessionsRouter);
app.use("/users", usersRouter);
app.use("/friends", friendsRouter);
app.use("/profiles", sessionChecker, profilesRouter);
app.use("/admin", adminRouter);
app.use("/likes", likesRouter);
app.use("/comments", sessionChecker, commentsRouter);

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
