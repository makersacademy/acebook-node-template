const express = require("express");
const router = express.Router();
const LikesController = require("../controllers/likes");

router.post("/", LikesController.Create);

module.exports = router;
