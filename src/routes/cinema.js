const express = require("express");
const cinema = express.Router();
const cinemaController = require("../controllers/cinema");
cinema.get("", cinemaController.show);
module.exports = cinema;
