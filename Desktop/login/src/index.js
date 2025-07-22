const express = require("express");
const exphbs = require("express-handlebars");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 5500;

app.engine("handlebars", exphbs());

const html_path = path.join(__dirname, "index.html");
let html_content = undefined;

app.use(morgan("combined"));

fs.readFile(html_path, "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  html_content = data;
});

app.get("/", (req, res) => {
  res.send(html_content || "<h1>Loading...</h1>");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
