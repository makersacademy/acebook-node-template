const express = require("express");
const router = express.Router();

const SessionsController = require("../controllers/sessions");

router.get("/login", SessionsController.New);
// router.get("/signup", SessionsController.New);
router.post("/", SessionsController.Create);
router.delete("/", SessionsController.Destroy);

module.exports = router;
