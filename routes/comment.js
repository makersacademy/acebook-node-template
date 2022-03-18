const express = require("express");
const router = express.Router();

const CommentController = require("../controllers/comment.js");

router.get("/new", CommentController.New);
router.post("/create", CommentController.Create);

module.exports = router; 