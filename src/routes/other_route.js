const express = require("express");
const otherRouter = express.Router();
const otherController = require("../controllers/other_controller");

// Define routes here
otherRouter.get("/vouchers/check/:code", otherController.validateVoucher);
otherRouter.get("/foods/menu", otherController.getFoods);

module.exports = otherRouter;