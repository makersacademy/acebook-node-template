const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.get("/friendslist", UsersController.FriendsList);
router.post("/settings/photo", UsersController.ChangePhoto);
router.post("/settings", UsersController.UpdateSettings);
router.get("/settings", UsersController.Settings);
router.get("/new", UsersController.New);
router.post("/", UsersController.Create);
router.post("/requests", UsersController.ConfirmRequest);
router.get("/requests", UsersController.Requests);
router.get("/index", UsersController.Profile);
router.post("/:id", UsersController.FriendRequest);
router.get("/:id", UsersController.OtherProfile);

// friends request routes

module.exports = router;
