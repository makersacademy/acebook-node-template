const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");
// const User = require("../models/user");

router.get("/new", UsersController.New);
router.get("/messages", UsersController.Messages);
router.get("/friends", UsersController.Friends);
router.get("/notifications", UsersController.Notifications);
router.get("/profile", UsersController.Profile);
router.post("/", UsersController.Create);
router.get("/search_friends", UsersController.Search_friends);


module.exports = router;
