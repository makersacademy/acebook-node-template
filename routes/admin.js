const express = require("express");
const router = express.Router();

const AdminController = require("../controllers/admin");

router.delete("/reset", AdminController.Destroy);

module.exports = router;
