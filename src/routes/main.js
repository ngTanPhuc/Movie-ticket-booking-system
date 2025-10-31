const cinema = require("./cinema");
function router(app) {
  app.use("/cinema", cinema);
}

module.exports = router;
