const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.get("/all", UsersController.All);
router.post("/friends", UsersController.Connect);

module.exports = router;