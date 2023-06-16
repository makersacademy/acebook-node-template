const express = require("express");
const router = express.Router();
const multer = require("multer");
const UsersController = require("../controllers/users");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/new", UsersController.New);
router.post("/", upload.single("image"), UsersController.Create);

module.exports = router;
