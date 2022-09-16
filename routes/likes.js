const express = require("express");
const router = express.Router();

const LikesController = require("../controllers/likes");

router.put("/new/posts/:postId", LikesController.UpdatePost);
router.put("/new/comments/:commentId", LikesController.UpdateComment);

module.exports = router;
