const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.get("/new", UsersController.New);
router.post("/", UsersController.Create);
router.get("/:id", UsersController.Details);
router.post("/:id/request", UsersController.Request);

module.exports = router;
