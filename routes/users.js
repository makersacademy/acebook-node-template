const express = require("express");
const router = express.Router();

const { UsersController, UserValidation } = require("../controllers/users");

router.get("/new", UsersController.New);
router.post("/", UserValidation, UsersController.Create);
// router.post("/", UsersController.Create);
router.get("/profile/:username", UsersController.Profile);

module.exports = router;
