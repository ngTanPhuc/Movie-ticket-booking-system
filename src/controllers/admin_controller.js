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
            console.log("BODY CỦA REQUEST");
            console.log(req.body);
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
            const result = await AdminService.createMovie(
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
            const result = await AdminService.updateMovie(
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
}

module.exports = new AdminController();
