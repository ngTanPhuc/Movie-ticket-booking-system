const express = require("express");
const cinemaRouter = express.Router();
const cinemaController = require("../controllers/cinema");
// Define routes here
cinemaRouter.get("/", cinemaController.showAll);
cinemaRouter.get("/search", cinemaController.showAll); // show all
cinemaRouter.get("/search/:name", cinemaController.search);
// crud phim
cinemaRouter.get("/view/:id", cinemaController.retrieve);
cinemaRouter.post("/add", cinemaController.add);
cinemaController.post("/remove/:id", cinemaController.remove);
cinemaController.post("/update/:id", cinemaController.update);

module.exports = cinemaRouter;