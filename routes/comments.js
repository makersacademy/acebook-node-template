const express = require("express");
const router = express.Router();

const CommentsController = require("../controllers/comments");

router.get("/:postId", CommentsController.Index);
router.post("/:postId", CommentsController.Create);

module.exports = router;
