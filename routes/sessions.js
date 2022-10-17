const express = require("express");
const router = express.Router();

const SessionsController = require("../controllers/sessions");

router.get("/new", SessionsController.New);
router.post("/new", SessionsController.Create);
router.get("/delete", SessionsController.Destroy);
// router.delete("/", SessionsController.Destroy);

module.exports = router;
