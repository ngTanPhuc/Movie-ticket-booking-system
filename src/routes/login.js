const express = require("express");
const loginRouter = express.Router();
const loginController = require("../controllers/login");
// Define routes here
loginRouter.get("/", loginController.show);
loginRouter.post("/", loginController.login);

module.exports = loginRouter;