const express = require("express");
const router = express.Router();
const sessionChecker = require("../util/sessionchecker");
const UsersController = require("../controllers/users");

router.get("/new", UsersController.New);
router.post("/", UsersController.Create);
router.get("/profile", sessionChecker, UsersController.Profile);
router.get("/photo/:id", UsersController.ProfilePhoto);
router.get("/all", UsersController.AllUsers);
module.exports = router;
