const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer").upload;
const UsersController = require("../controllers/users");

router.get("/new", UsersController.New);
router.post("/", upload.single("image"), UsersController.Create);

module.exports = router;
