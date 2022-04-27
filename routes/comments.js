const express = require("express");
const router = express.Router();

const CommentsController = require("../controllers/comments");

router.post("/comment/:id/commented", CommentsController.Comment);

module.exports = router;
