const express = require("express");
const loginRouter = express.Router();
const loginController = require("../controllers/login_controller");
const { authenticateToken } = require("../middlewares/auth");

// Define routes here
loginRouter.post("/login", loginController.login);
loginRouter.post("/register", loginController.register);
loginRouter.get("/me", authenticateToken, loginController.getMyInfo);

module.exports = loginRouter;