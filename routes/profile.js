const express = require("express");
const router = express.Router();

const ProfileController = require("../controllers/profile")

router.get("/user/:username", ProfileController.Index);
router.get('/:username', ProfileController.OtherUser);
router.get('/user/:username/editInfo', ProfileController.EditInfoView)

module.exports = router;