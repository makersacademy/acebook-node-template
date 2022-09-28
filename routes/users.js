const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");



router.get("/new", UsersController.New);
router.post("/", UsersController.Create);
router.get("/account", UsersController.Account);
router.get("/:id", UsersController.Profile);


module.exports = router;
