const express = require("express");
const router = express.Router();
const multer = require('multer');
const ImagesController = require("../controllers/images");
const { parser } = require("../cloudinary.config");


router.get("/", ImagesController.Index);
router.post("/", parser.single('image'), ImagesController.Upload);


module.exports = router;
