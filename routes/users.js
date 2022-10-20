const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.post("/settings/photo", UsersController.ChangePhoto);
router.post("/settings", UsersController.UpdateSettings);
router.get("/settings", UsersController.Settings);
router.get("/new", UsersController.New);
router.post("/", UsersController.Create);
router.get("/index", UsersController.Profile);
router.get("/:id", UsersController.OtherProfile);

// friends request routes

module.exports = router;
