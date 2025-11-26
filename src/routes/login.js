const express = require("express");
const loginRouter = express.Router();
const loginController = require("../controllers/cinema");
// Define routes here
loginRouter.get("/", loginController.show);
loginRouter.post("/:username/:password", loginController.login);

module.exports = cinemaRouter;