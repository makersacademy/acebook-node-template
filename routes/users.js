const express = require("express");
const router = express.Router();
const path = require('path')
const multer = require('multer')
const ProfileImage = require('../models/user')

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
  }
});

const UsersController = require("../controllers/users");

router.get("/new", UsersController.New);
router.post("/", upload.single('file'), UsersController.Create);
router.get("/profile", UsersController.Profile);

router.get("/userlist", UsersController.UserList);
router.get("/friendlist", UsersController.FriendList);
router.post("/addfriend/:id", UsersController.Addfriend);
router.post("/deletefriend/:id", UsersController.Deletefriend);

module.exports = router;
