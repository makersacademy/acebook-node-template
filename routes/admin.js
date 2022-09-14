const express = require("express");
const router = express.Router();

const AdminController = require("../controllers/admin");

router.get("/", AdminController.Index);
router.get("/posts", AdminController.Posts);
router.delete("/reset", AdminController.Destroy);

module.exports = router;
