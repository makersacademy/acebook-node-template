const express = require("express");
const router = express.Router();

const LikesController = require("../controllers/likes");

router.post("/", LikesController.Like);
router.delete("/", LikesController.DeleteLike);

module.exports = router;