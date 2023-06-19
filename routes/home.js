const express = require("express");
const router = express.Router();
const isAuthenticated = require('../authMiddleware');

const HomeController = require("../controllers/home");

router.get("/", isAuthenticated, HomeController.Index);

module.exports = router;
