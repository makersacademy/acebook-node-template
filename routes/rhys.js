const express = require("express");
const router = express.Router();

const RhysController = require("../controllers/rhys");

router.get("/", RhysController.Index);

module.exports = router;