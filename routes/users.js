var express = require('express');
var router = express.Router();
const multer = require('multer');

var UsersController = require('../controllers/users');

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname);
  }
});

const upload = multer({ storage: fileStorageEngine });

router.get('/new', UsersController.New);
router.post('/', UsersController.Create);
router.get('/profile', UsersController.Profile);
router.post('/upload', upload.single("profile-picture"), UsersController.UploadPicture);

module.exports = router;
