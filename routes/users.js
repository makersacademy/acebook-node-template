const express = require("express");
const router = express.Router();

const User = require('../models/user')
const path = require('path')
const multer = require('multer')
const uploadTo = path.join('public', User.imagePath)
const imageMimeTypes = ['image/jpeg', 'image/png'];
const upload = multer({
  dest: uploadTo,
  fileFilter: (req, file, callback) => {
    callback(null, imageMimeTypes.includes(file.mimetype))
  }
})

const UsersController = require("../controllers/users");

router.get("/new", UsersController.New);
router.post("/", UsersController.Create);
router.get("/profile", UsersController.Profile);
router.post("/updateprofile", UsersController.UpdateProfile);
router.get("/userlist", UsersController.UserList);
router.get("/friendlist", UsersController.FriendList);
router.post("/addfriend/:id", UsersController.Addfriend);
router.post("/deletefriend/:id", UsersController.Deletefriend);

module.exports = router;
