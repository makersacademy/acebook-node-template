const express = require("express");
const upload = require("../middleware/multer");
const router = express.Router();
const ProfileController = require("../controllers/profile");

router.get("/", ProfileController.Index);
router.get("/edit", ProfileController.Edit);
router.post("/edit", upload.single("image"), ProfileController.EditUser);

module.exports = router;
