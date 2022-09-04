const express = require("express");
const router = express.Router();
const upload = require("../models/upload");
const ImageController = require("../controllers/images");

router.get("/", ImageController.Index);
router.post("/", upload.single("image"), ImageController.Add); //upload.single("id of submit in hbs")
module.exports = router;
