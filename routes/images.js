const express = require("express");
const router = express.Router();

const ImagesController = require("../controllers/images");

router.get("/", ImagesController.Index);
router.post("/", ImagesController.Upload);

module.exports = router;