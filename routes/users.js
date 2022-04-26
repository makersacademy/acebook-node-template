const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.get("/new", UsersController.New);
router.post("/", UsersController.Create);
router.get("/:username/profilepicture", UsersController.ProfilePicture);
router.get("/profilepicture", UsersController.ProfilePicture);
router.post("/befriend/:username", UsersController.Befriend);

module.exports = router;
