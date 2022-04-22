const express = require("express");
const router = express.Router();

const OrlaneController = require("../controllers/orlane");

router.get("/", OrlaneController.Index);

module.exports = router;
