const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const methodOverride = require('method-override')

const homeRouter = require('./routes/home')
const postsRouter = require('./routes/posts')
const sessionsRouter = require('./routes/sessions')
const usersRouter = require('./routes/users')

const User = require('./models/user')

var bodyParser = require('body-parser')
const app = express()
const multer = require('multer')

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'profile_pictures')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
  }
});

var upload = multer({ storage: storage });

// app.post('/users', upload.single('avatar'), async (req, res) => {
//   // req.file is the name of your file in the form above, here 'avatar'
//   // req.body will hold the text fields, if there were any 
//   // req.file can be used to access all file properties
//   console.log(req.file)
//   try {
//     //check if the request has an image or not
//     if (!req.file) {
//       res.json({
//         success: false,
//         message: 'You must provide at least 1 file'
//       })
//     } else {
//       let imageUploadObject = {
//         first_name: req.body.first_name,
//         last_name: req.body.last_name,
//         DOB: req.body.DOB,
//         email: req.body.email,
//         password: req.body.password,
//         profile_picture: {
//           data: req.file.buffer,
//           contentType: req.file.mimetype
//         }
        
//       }
//       console.log(imageUploadObject);
//       const uploadObject = new User (imageUploadObject);
//       // saving the object into the database
//       const uploadProcess = await uploadObject.save();
//     }
//   } catch (error) {
//     console.error(error)
//     res.status(500).send("Server Error")
//   }
// });


// handlebars
var hbs = require('hbs');
hbs.registerHelper('dateFormat', require('handlebars-dateformat'));



// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))

app.use(
  session({
    key: 'user_sid',
    secret: 'super_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000
    }
  })
)

// clear the cookies after user logs out
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid')
  }
  next()
})

// middleware function to check for logged-in users
const sessionChecker = (req, res, next) => {
  if (!req.session.user && !req.cookies.user_sid) {
    res.redirect('/sessions/new')
  } else {
    next()
  }
}

// route setup
app.use('/', homeRouter)
app.use('/posts', sessionChecker, postsRouter)
app.use('/sessions', sessionsRouter)
app.use('/users', upload.single('image'), usersRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

app.use(express.static(path.join(__dirname + '/profile_pictures')))

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
