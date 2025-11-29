const MovieService = require("../services/movie_service");

class MovieController {
    async getAll(req, res){
        try {
            console.log("controller get all");
            const status = req.query.status || null;
            const movies = await MovieService.getAll(status); // movies là array
            
            res.json({ success: true, data: movies });
        } catch (error) {
            res.status(500).json({success: false, error: error.message});
        }
    }
    async getById(req, res){
        try {
            const id = req.params.id;
            console.log("controller get by id");            
            const movies = await MovieService.getById(id);
            res.json({ success: true, data: movies });
        } catch (error) {
            res.status(500).json({success: false, error: error.message});
        }
    } 
    async getTopRevenue(req, res){
        try {
            const movies = await MovieService.getTopRevenue();
            res.json({ success: true, data: movies });
        } catch (error) {
            res.status(500).json({success: false, error: error.message});
        }
    } 
}

module.exports = new MovieController();
