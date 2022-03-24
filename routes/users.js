const express = require("express");
const router = express.Router();
const path = require('path')
const multer = require('multer')
// const ProfileImage = require('../models/user')
const User = require('../models/user')
const uploadTo = path.join('public', User.imagePath)
const imageMimeTypes = ['image/jpeg', 'image/png'];
const UsersController = require("../controllers/users");

const storage = multer.diskStorage({
  destination:function(req, file, callback) {
    callback(null, './public/uploads/profileimage');
  },

  filename:function (req, file, callback) {
    callback(null,Date.now() + file.originalname);
  },
});

const upload = multer({
  storage:storage,
  limits:{
    fieldSize: 1024 * 1024 * 3,
  },
  dest: uploadTo,
  fileFilter: (req, file, callback) => {
    callback(null, imageMimeTypes.includes(file.mimetype))
  }
})

router.get("/new", UsersController.New);
router.post("/", upload.single('file'), UsersController.Create);
router.get("/profile", UsersController.Profile);
router.post("/updateprofile", UsersController.UpdateProfile);
router.post("/addfriend/:id", UsersController.Addfriend);
router.post("/deletefriend/:id", UsersController.Deletefriend);

module.exports = router;
