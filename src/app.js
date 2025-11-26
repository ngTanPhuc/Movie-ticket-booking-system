const express = require("express"); // Fast, unopinionated, minimalist web framework for Node.js
const morgan = require("morgan"); // HTTP request logger middleware for node.js
const app = express();
const port = 3000;
const router = require("./routes/main");
const {connectDB} = require("./models/connect_sql");
require("dotenv").config();
app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
connectDB();
router(app);
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
