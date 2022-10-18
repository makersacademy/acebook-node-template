const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.get("/requests", UsersController.Requests);
router.post("/requests", UsersController.ConfirmRequest)
router.get("/new", UsersController.New);
router.post("/", UsersController.Create);
router.get("/index", UsersController.Profile);
router.get("/:id", UsersController.OtherProfile);
router.post("/:id", UsersController.FriendRequest);


module.exports = router;
