const express = require("express");
const cinemaRouter = express.Router();
const cinemaController = require("../controllers/cinema_controller");
// Define routes here
cinemaRouter.get("/", cinemaController.getAll); 
//cinemaRouter.get("/:id", cinemaController.getById);
cinemaRouter.get("/:id", cinemaController.getById);

module.exports = cinemaRouter;