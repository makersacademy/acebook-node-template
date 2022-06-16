const express = require("express");
const router = express.Router();

const LikesController = require("../controllers/likes");

router.post("/", LikesController.AddLike);
router.delete("/", LikesController.RemoveLike);

module.exports = router;
