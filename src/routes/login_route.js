const express = require("express");
const loginRouter = express.Router();
const loginController = require("../controllers/login_controller");
const { authenticateToken } = require("../middlewares/auth");

// Define routes here
loginRouter.post("/login", authenticateToken, loginController.login);
loginRouter.post("/register", authenticateToken, loginController.register);
loginRouter.get("/register/me", authenticateToken, loginController.getMyInfo);

module.exports = loginRouter;