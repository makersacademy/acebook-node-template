const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");



router.get("/new", UsersController.New);
router.post("/", UsersController.Create);
router.get("/account", UsersController.Account);
router.get("/editmyprofile", UsersController.Edit);
router.post("/account", UsersController.Update);
router.get("/:id", UsersController.Profile);

module.exports = router;
