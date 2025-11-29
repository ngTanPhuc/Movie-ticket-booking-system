const express = require("express");
const cinemaRouter = express.Router();
const cinemaController = require("../controllers/cinema_controller");
const authenticateToken = require("../middlewares/auth");
// Define routes here
cinemaRouter.get("/", authenticateToken, cinemaController.getAll);
//cinemaRouter.get("/:id", cinemaController.getById);
cinemaRouter.get("/:id", authenticateToken, cinemaController.getById);

module.exports = cinemaRouter;
