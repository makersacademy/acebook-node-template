
var express = require('express');
var router = express.Router();
var multer = require('multer');

var UserController = require('../controllers/user');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
  }
});

var upload = multer({ storage: storage });

router.get('/signup', UserController.Index);
router.post('/signup', upload.single('image'), UserController.Create);

router.post('/login', UserController.Login);
router.get('/logout', UserController.Logout);

router.post('/profile', upload.single('image'), UserController.Profile);
router.get('/profile', UserController.ImageForm);

module.exports = router;
