const express = require("express");
const bookingRouter = express.Router();
const bookingController = require("../controllers/booking_controller");
const authenticateToken = require("../middlewares/auth");
console.log("booking route loaded");
// Define routes here
bookingRouter.post("/", authenticateToken, bookingController.createBooking);
bookingRouter.get("/history", authenticateToken, bookingController.getHistory);
module.exports = bookingRouter;
