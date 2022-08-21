const express = require("express");
const router = express.Router();

const LikesPostController = require("../controllers/likes-post");

router.post("/", LikesPostController.Like);
router.delete("/", LikesPostController.DeleteLike);

module.exports = router;