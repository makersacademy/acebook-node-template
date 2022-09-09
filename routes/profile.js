const express = require("express");
const router = express.Router();

const ProfileController = require("../controllers/profile");

router.get("/", ProfileController.Index);
router.get('/edit', ProfileController.Edit)
router.post('/', ProfileController.Edit)

module.exports = router;
