const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");
const requireLoggedOut = require("../functions/requireLoggedOut");

router.get("/new", requireLoggedOut, UsersController.New);
router.post("/", requireLoggedOut, UsersController.Create);

module.exports = router;