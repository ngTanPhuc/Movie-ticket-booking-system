const express = require("express");
const adminRouter = express.Router();
const adminController = require("../controllers/admin_controller");

// Define routes here
adminRouter.get("/stats", adminController.getStats);
// movies CRUD
adminRouter.post("/movies", adminController.createMovie);
adminRouter.put("/movies/:id", adminController.updateMovie);
adminRouter.delete("/movies/:id", adminController.deleteMovie);
// cinema CRUD
adminRouter.post("/cinemas", adminController.createCinema);
adminRouter.put("/cinemas/:id", adminController.updateCinema);
adminRouter.delete("/cinemas/:id", adminController.deleteCinema);
// showtime CRUD
adminRouter.post("/showtimes", adminController.createShowtime);
adminRouter.put("/showtimes/:id", adminController.updateShowtime);
adminRouter.delete("/showtimes/:id", adminController.deleteShowtime);
module.exports = adminRouter;