const express = require("express");
const router = express.Router();

const SessionsController = require("../controllers/sessions");

router.get("/login", SessionsController.New);
router.post("/", SessionsController.Create);
router.get("/logout", SessionsController.Destroy);

module.exports = router;
