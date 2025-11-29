const OtherService = require("../services/other_service");
class OtherController {
    async validateVoucher(req, res){
        try {
            const id = req.params.code;
            const result = await OtherService.validateVoucher(id);

            res.json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({success: false, error: error.message});
        }
    }
    async getFoods(req, res){
        try {
            const result = await OtherService.getFoods();
            res.json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({success: false, error: error.message});
        }
    }
}

module.exports = new OtherController();
