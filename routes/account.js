const express = require("express");
const router = express.Router();

const AccountController = require("../controllers/account");

var multer = require('multer');
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/profilepics')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
});
var upload = multer({ storage: storage });

router.get("/", AccountController.Index);
router.post("/uploadProfilePic", upload.single('image'), AccountController.Profilepic);

module.exports = router;
