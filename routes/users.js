const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.get("/new", UsersController.New);
router.post("/", UsersController.Create);
router.post("/requests", UsersController.ConfirmRequest)
router.get("/requests", UsersController.Requests);
router.get("/index", UsersController.Profile);
router.post("/:id", UsersController.FriendRequest);
router.get("/:id", UsersController.OtherProfile);




module.exports = router;