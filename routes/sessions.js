const express = require("express");
const router = express.Router();

const SessionsController = require("../controllers/sessions");
const requireLoggedOut = require("../functions/requireLoggedOut");

router.get("/new", requireLoggedOut, SessionsController.New);
router.post("/", requireLoggedOut, SessionsController.Create);
router.delete("/", SessionsController.Destroy);

module.exports = router;