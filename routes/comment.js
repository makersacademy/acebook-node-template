const express = require("express");
const router = express.Router();

const CommentController = require("../controllers/comment.js");

router.get("/", CommentController.Index);
router.post("/create", CommentController.Create);
router.get("/new", CommentController.New);
router.post("/like",CommentController.Like);
router.post("/unlike",CommentController.Unlike);

module.exports = router; 