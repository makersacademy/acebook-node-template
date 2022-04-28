const express = require("express");
const router = express.Router();

const SaiyuktaController = require("../controllers/saiyukta");

router.get("/", SaiyuktaController.Index);

module.exports = router;
