const express = require("express");
const router = express.Router();

const CommentController = require("../controllers/comment.js");

router.get("/", CommentController.Index);
router.post("/create", CommentController.Create);
router.get("/new", CommentController.New);

module.exports = router; 