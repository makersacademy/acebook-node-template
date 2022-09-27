const express = require("express");
const router = express.Router();

const CommentsController = require("../controllers/comments");

router.get("/", CommentsController.Index);
router.post("/:postId", CommentsController.Create);
router.get("/new", CommentsController.New);

module.exports = router;
