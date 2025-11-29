const express = require("express");
const movieRouter = express.Router();
const movieController = require("../controllers/movie_controller");
const authenticateToken = require("../middlewares/auth");
// Define routes here
movieRouter.get("/",authenticateToken, movieController.getAll);
movieRouter.get("/top-revenue",authenticateToken, movieController.getTopRevenue);
movieRouter.get("/:id",authenticateToken, movieController.getById); // url ví dụ: /movies/PHM0003

module.exports = movieRouter;