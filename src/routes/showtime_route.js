const express = require("express");
const showtimeRouter = express.Router();
const showtimeController = require("../controllers/showtime_controller");
const authenticateToken = require("../middlewares/auth");
console.log("showtime route loaded");
// Define routes here
showtimeRouter.get("/", authenticateToken, showtimeController.getAll);
showtimeRouter.get("/:id/seats", authenticateToken, showtimeController.getById);

module.exports = showtimeRouter;
