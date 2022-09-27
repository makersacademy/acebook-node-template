const express = require("express");
const router = express.Router();

const ImagesController = require("../controllers/images");

var multer = require('multer');
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
var upload = multer({ storage: storage });

router.get("/all", ImagesController.Index);
router.get("/upload", ImagesController.New);
router.post("/", upload.single('image'), ImagesController.Create);

module.exports = router;