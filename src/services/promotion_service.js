const { executeQuery } = require("../models/connect_sql");
const Event = require("../models/event");
const Promotional = require("../models/promotional")
class PromotionService{
    async getAll(){
        const result = await executeQuery(`
            SELECT * FROM SuKien;    
        `);
        if (result.length > 0){
            return result.map(row => new Event(row));
        }
        else return [];
    }
    async getById(id){
        const result = await executeQuery(`
            SELECT * FROM KhuyenMai WHERE ma_su_kien=?
        `, [id]);
        if (result.length > 0){
            return result.map(row => new Promotional(row));
        }
        else return [];
    }

}

module.exports = new PromotionService();