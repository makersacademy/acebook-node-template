const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.get("/new", UsersController.New);
router.post("/", UsersController.Create);
router.get("/profile", UsersController.Profile);
router.get("/friend/:name", UsersController.Friend);
router.post("/friend/:name", UsersController.AddFriend);

module.exports = router;
