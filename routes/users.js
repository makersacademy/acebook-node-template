const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

const UsersController = require("../controllers/users");

router.get("/new", UsersController.New);
router.get("/profile", UsersController.Index);
router.post("/", upload.single('photo'), UsersController.Create);

module.exports = router;
