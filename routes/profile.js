const express = require("express");
const router = express.Router();

const ProfileController = require("../controllers/profile")

router.get("/user/:username", ProfileController.Index);
router.get('/:username', ProfileController.OtherUser);
router.get('/user/:username/editInfo', ProfileController.EditInfoView)
router.post("/user/:username/editInfo", ProfileController.EditInfo)

module.exports = router;