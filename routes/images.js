const express = require("express");
const router = express.Router();

const ImagesController = require("../controllers/images");

router.get("/:filename", ImagesController.Show);

module.exports = router;
