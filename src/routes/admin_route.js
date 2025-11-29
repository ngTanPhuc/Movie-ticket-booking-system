const express = require("express");
const adminRouter = express.Router();
const adminController = require("../controllers/admin_controller");

// Define routes here
adminRouter.get("/stats", adminController.getStats);
// movies CRUD
adminRouter.post("/movies", adminController.createMovie);
adminRouter.put("/movies/:id", adminController.updateMovie);
// adminRouter.delete("/movies/:id", adminController.deleteMovie);

module.exports = adminRouter;