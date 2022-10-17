const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.get("/new", UsersController.New);
router.post("/", UsersController.Create);
router.get("/index", UsersController.Profile);
router.get("/:id", UsersController.OtherProfile);

module.exports = router;
