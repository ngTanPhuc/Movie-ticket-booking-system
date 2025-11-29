const AdminService = require("../services/admin_service");

class AdminController {
    async getStats (req,res){
        try {
            const result = await AdminService.getStats();
            res.json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({success: false, error: error.message});
        }
    }
    // movies CRUD
    async createMovie(req, res){
        try {
            const {
                title,
                duration,
                releaseDate,
                endDate,
                ageRating,
                trailer,
                language,
                status,
                summary
            } = req.body;
            await AdminService.createMovie(
                title,
                duration,
                releaseDate,
                endDate,
                ageRating,
                trailer,
                language,
                status,
                summary
            );
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({success: false, error: error.message});
        }
    }
    async updateMovie(req, res){
        try {
            const id = req.params.id;
            await AdminService.updateMovie(
                id,
                req.body.title,
                req.body.duration,
                req.body.releaseDate,
                req.body.endDate,
                req.body.ageRating,
                req.body.trailer,
                req.body.language,
                req.body.status,
                req.body.summary
            )
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({success: false, error: error.message});
        }
    }
    async deleteMovie(req, res){
        try {
            const id = req.params.id;
            await AdminService.deleteMovie(id);
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({success: false, error: error.message});
        }
    }
    // cinemas CRUD
    async createCinema(req, res){
        try {
            const { name, status, address } = req.body;
            await AdminService.createCinema(name, status, address);
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({success: false, error: error.message});
        }
    }
    async updateCinema(req, res){
        try {
            const id = req.params.id;
            const { name, status, address } = req.body;
            await AdminService.updateCinema(id, name, status, address);
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({success: false, error: error.message});
        }
    }
    async deleteCinema(req, res){
        try {
            const id = req.params.id;
            await AdminService.deleteCinema(id);
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({success: false, error: error.message});
        }
    }
    
    // showtime CRUD
    async createShowtime(req, res){
        try {
            const { roomId, movieId, date, startTime, endTime } = req.body;
            console.log("___ ctrl");
            await AdminService.createShowtime(roomId, movieId, date, startTime, endTime);
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({success: false, error: error.message});
        }
    }
    async updateShowtime(req, res){
        try {
            const id = req.params.id;
            const { roomId, movieId, date, startTime, endTime } = req.body;
            await AdminService.updateShowtime(id, roomId, movieId, date, startTime, endTime);
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({success: false, error: error.message});
        }
    }
    async deleteShowtime(req, res){
        try {
            const id = req.params.id;
            await AdminService.deleteShowtime(id);
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({success: false, error: error.message});
        }
    }
}

module.exports = new AdminController();
