const ShowtimeService = require("../services/showtime_service")
class ShowtimeController {
    async getAll(req, res){
        try {
            const movie_id = req.query.movie_id;
            const date = req.query.date || null;
            const cinema_id = req.query.cinema_id || null;

            const showtimes = await ShowtimeService.getAll(movie_id, date, cinema_id);
            res.json({ success: true, data: showtimes });
        } catch (error) {
            res.status(500).json({success: false, error: error.message});
        }
    }
    async getById(req, res){
        console.log("ctrl get by id");
        try {
            const id = req.params.id;
            const showtimes = await ShowtimeService.getById(id);
            res.json({ success: true, data: showtimes });
        } catch (error) {
            res.status(500).json({success: false, error: error.message});
        }
    }
}

module.exports = new ShowtimeController();
