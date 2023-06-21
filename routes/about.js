const express = require("express");
const router = express.Router();
const isAuthenticated = require('../authMiddleware');

const AboutController = require("../controllers/about");

router.get("/about", AboutController.Index);

module.exports = router;
