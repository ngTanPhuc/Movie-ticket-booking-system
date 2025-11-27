require("dotenv").config();

/*
const dbConfig = {
  host: process.env.host,
  user: process.env.user,
  password: "",
  database: process.env.database,
  waitForConnections: true,
};
*/
const dbConfig = {
  host: "localhost",
  user: "tdung",
  password: "4789",
  database: "TicketBookingSystem",
  waitForConnections: true,
};

module.exports = dbConfig;
