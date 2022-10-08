const express = require("express");
const router = express.Router();
const signedInRedirect = require("./redirects/signedInRedirect");
const signedOutRedirect = require("./redirects/signedOutRedirect")

const UsersController = require("../controllers/users");


router.post("/profile/:userId/add", signedOutRedirect, UsersController.AddFriend)
router.get("/new", signedInRedirect, UsersController.New);
router.post("/", UsersController.Create);
router.get("/profile/:userId",signedOutRedirect, UsersController.ViewProfile);
router.post("/:userId/acceptRequest", UsersController.AcceptFriend);
router.post("/:userId/rejectRequest", UsersController.RejectFriend)

module.exports = router;
