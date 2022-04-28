const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.get("/new", UsersController.New);
router.post("/", UsersController.Create);
router.get("/:username/profilepicture", UsersController.ProfilePicture);
router.get("/profilepicture", UsersController.ProfilePicture);
router.post("/befriend/:username", UsersController.Befriend);
router.get("/profile/:username", UsersController.Profile);
router.get("/edit/:username", UsersController.Edit);
router.post("/edit/:username", UsersController.SaveEdit);
router.get("/myprofile", UsersController.MyProfile);

module.exports = router;
