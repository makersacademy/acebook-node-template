const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.get("/new", UsersController.New);
router.post("/", UsersController.Create);
// router.post("/friend", UsersController.AddFriend);
// router.get("/friend", UsersController.NewFriend);

module.exports = router;
