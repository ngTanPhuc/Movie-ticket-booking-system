const login = require("./login");
const movieRouter = require("./movie_route");
const cinemaRouter = require("./cinema_route");
const showtimeRouter = require("./showtime_route");
const bookingRouter = require("./booking_route");
const otherRouter = require("./other_route");
// const promotionRouter = require("./promotion_route");

function router(app) {
  app.use("/login", login);
  app.use("/cinemas", cinemaRouter);
  app.use("/movies", movieRouter);
  app.use("/showtimes", showtimeRouter);
  app.use("/booking", bookingRouter);
  app.use("/other", otherRouter);
  // app.use("/promotion", promotionRouter);
}

module.exports = router;
