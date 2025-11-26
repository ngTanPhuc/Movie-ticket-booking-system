const cinema = require("./cinema");
const login = require("./login");
function router(app) {
  app.use("/login", login);
  app.use("/cinema", cinema);
}

module.exports = router;
