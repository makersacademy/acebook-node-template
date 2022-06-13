const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: './public/uploads/' })

const UsersController = require("../controllers/users");

router.get("/new", UsersController.New);
router.post("/", UsersController.Create);
router.get("/photo", UsersController.NewPhoto);
router.post("/uploadphoto", upload.single('myImage'), UsersController.CreatePhoto);

module.exports = router;
