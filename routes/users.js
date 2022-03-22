const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.get("/new", UsersController.New);
router.post("/", UsersController.Create);
router.get("/profile", UsersController.Profile);

router.get("/userlist", UsersController.UserList);
router.get("/friendlist", UsersController.FriendList);
router.post("/addfriend/:id", UsersController.Addfriend);

module.exports = router;
