const express = require("express");
const router = express.Router();

const ProfileController = require("../controllers/profile");

router.get("/:user_id", ProfileController.Index);
router.post("/", ProfileController.Upload);

module.exports = router;
