const express = require("express");
const router = express.Router();

const CommentsController = require("../controllers/comments");

router.post("/posts/:id/comment", CommentsController.Create);

module.exports = router;