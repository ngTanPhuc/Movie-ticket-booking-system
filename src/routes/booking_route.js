const express = require("express");
const bookingRouter = express.Router();
const bookingController = require("../controllers/booking_controller");

console.log("booking route loaded");
// Define routes here
bookingRouter.post("/", bookingController.createBooking); 
bookingRouter.get("/history", bookingController.getHistory);
module.exports = bookingRouter;