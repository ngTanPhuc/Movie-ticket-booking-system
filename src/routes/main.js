const login = require("./login");
const movieRouter = require("./movie_route");
const cinemaRouter = require("./cinema_route");
const showtimeRouter = require("./showtime_route");

function router(app) {
  app.use("/login", login);
  app.use("/cinemas", cinemaRouter);
  app.use("/movies", movieRouter);
  app.use("/showtimes", showtimeRouter);
}

module.exports = router;
