const express = require("express");
const router = express.Router();

const ClicksController = require("../controllers/clicks");

router.post("/", ClicksController.New);



module.exports = router;