require("dotenv").config();

const dbConfig = {
  host: process.env.host,
  user: process.env.user,
  password: "",
  database: process.env.database,
  waitForConnections: true,
};

module.exports = dbConfig;
