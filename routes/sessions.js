const express = require("express");
const router = express.Router();

const SessionsController = require("../controllers/sessions");

router.get("/new/error/account", SessionsController.Error)
router.get("/new/error", SessionsController.Error);
router.get("/new", SessionsController.New);
router.post("/", SessionsController.Create);
router.delete("/", SessionsController.Destroy);



module.exports = router;
