const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.get("/new", UsersController.New);
router.post("/", UsersController.Create);
router.get("/profile/:username", UsersController.Profile);
router.get("/search", UsersController.Search);

module.exports = router;
