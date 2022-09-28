const express = require("express");
const router = express.Router();

const SessionsController = require("../controllers/sessions");
const { route } = require("./home");
const logRouterDeclaration = (res, req, next) => {
    console.log(res.body.loggingMessage)
    res.body.loggingMessage = "logrouterdeclaration";
    next();
}

const logNewRouterDeclaration = (res, req, next) => {
    console.log(res.body.loggingMessage)
    console.log("AND NOW WE SHOULD BE AT THE END")
    next();
}
router.use(logRouterDeclaration)
router.get("/new", logNewRouterDeclaration, SessionsController.New);
router.post("/", SessionsController.Create);
router.delete("/", SessionsController.Destroy);

module.exports = router;
