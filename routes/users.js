const express = require("express");
const router = express.Router();
const signedInRedirect = require("./redirects/signedInRedirect");
const signedOutRedirect = require("./redirects/signedOutRedirect")

const UsersController = require("../controllers/users");

router.get("/new", signedInRedirect, UsersController.New);
router.post("/", UsersController.Create);
router.get("/profile/:userId",signedOutRedirect, UsersController.ViewProfile);

module.exports = router;
