const express = require("express");
const app = express();
const morgan = require("morgan");
const port = 5500;
const path = require("path");
const fs = require("fs");
const html_path = path.join(__dirname, "index.html");
var html_content = undefined;
app.use(morgan("combined"));
fs.readFile(html_path, "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  html_content = data;
});
app.get("/", (req, res) => {
  res.send(html_content);
});
app.listen(port);
