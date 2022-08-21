const express = require("express");
const router = express.Router();

const LikesCommentController = require("../controllers/likes-comment");

router.post("/", LikesCommentController.Like);
router.delete("/", LikesCommentController.DeleteLike);

module.exports = router;