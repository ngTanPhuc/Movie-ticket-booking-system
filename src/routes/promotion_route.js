const express = require("express");
const promotionRouter = express.Router();
const promotionController = require("../controllers/promotion_controller");

// Define routes here
promotionRouter.get("/events", promotionController.getAll);
promotionRouter.get("/events/:id/promotions", promotionController.getById);

module.exports = promotionRouter;