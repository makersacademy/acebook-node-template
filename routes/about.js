const express = require("express");
const router = express.Router();

const AboutController = require("../controllers/about");

router.get("/", AboutController.Index);

module.exports = router;
