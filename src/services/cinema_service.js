const { executeQuery } = require("../models/connect_sql");
const Cinema = require("../models/cinema_model");

class CinemaService{
    async getAll(){
        console.log("cinema service get all");
        const result = await executeQuery(`SELECT * FROM RapChieu`);
        return result.map(row => new Cinema(row));
    }
    async getById(id){
        console.log("get by id");
        const result = await executeQuery(`SELECT * FROM RapChieu WHERE ma_rap='${id}'`);
        //return result;
        return new Cinema(result[0]);
    }
}

module.exports = new CinemaService();