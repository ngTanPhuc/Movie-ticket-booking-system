const express = require("express");
const showtimeRouter = express.Router();
const showtimeController = require("../controllers/showtime_controller");

console.log("showtime route loaded");
// Define routes here
showtimeRouter.get("/", showtimeController.getAll); 
showtimeRouter.get("/:id/seats", showtimeController.getById);

module.exports = showtimeRouter;