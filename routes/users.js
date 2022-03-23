const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.get("/new", UsersController.New);
router.post("/", UsersController.Create);
router.get("/profile", UsersController.Profile);

router.get("/userlist", UsersController.UserList);
router.get("/friendlist", UsersController.FriendList);
router.post("/addfriend/:id", UsersController.Addfriend);
router.post("/deletefriend/:id", UsersController.Deletefriend);
router.post("/acceptfriend/:id", UsersController.Acceptfriend);
router.post("/rejectfriend/:id", UsersController.Rejectfriend);

module.exports = router;
