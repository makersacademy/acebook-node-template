const express = require("express");
const router = express.Router();

const UploadController = require("../controllers/upload");

router.get("/", UploadController.Index);
router.post("/", UploadController.UploadImage);

module.exports = router;
