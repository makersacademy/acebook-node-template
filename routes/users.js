const express = require("express");
const router = express.Router();
const sessionChecker = require("../util/sessionchecker");
const UsersController = require("../controllers/users");
const multer = require('multer')();

router.get("/new", UsersController.New);
router.post("/", UsersController.Create);
router.get("/profile", sessionChecker, UsersController.Profile);
router.get("/profile/:id", sessionChecker, UsersController.ProfileOther)
router.post("/profile", sessionChecker, multer.single('img'), UsersController.EditProfile);
router.get("/profile/edit", sessionChecker, UsersController.EditPage);
router.get("/photo/:id", UsersController.ProfilePhoto);
router.get("/all", UsersController.AllUsers);
router.post("/follow", sessionChecker, UsersController.Follow)
module.exports = router;