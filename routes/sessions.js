const express = require("express");
const router = express.Router();

const SessionsController = require("../controllers/sessions");

router.post("/", SessionsController.Create);
router.delete("/", SessionsController.Destroy);

module.exports = router;
