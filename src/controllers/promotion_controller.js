const PromotionService = require("../services/promotion_service");

class PromotionController {
    async getAll(req,res){
        try {
            const result = await PromotionService.getAll();
            res.json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({success: false, error: error.message});
        }
    }
    async getById(req, res){
        try {
            const id = req.params.id;
            const result = await PromotionService.getById(id);
            res.json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({success: false, error: error.message});
        }
    }
}

module.exports = new PromotionController();
