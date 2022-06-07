const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

const UsersController = require("../controllers/users");

router.get("/new", UsersController.New);
router.post("/", upload.single('userImage'), UsersController.Create);

module.exports = router;
