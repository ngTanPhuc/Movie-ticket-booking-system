const { executeQuery } = require("../models/connect_sql");
const Showtime = require("../models/showtime_model");
const { search } = require("../routes/showtime_route");

class ShowtimeService{
    async getAll(movie_id, date, cinema_id){
       let query = `
            SELECT ma_suat_chieu, trang_thai, ngay_chieu, gio_bat_dau, gio_ket_thuc, ten_phong, ten_rap, dia_chi
            FROM SuatChieu NATURAL JOIN PhongChieu 
            NATURAL JOIN RapChieu
        `;
        
        const conditions = [];
        const params = [];
        
        if (movie_id) {
            conditions.push('sc.ma_phim = ?');
            params.push(movie_id);
        }
        
        if (date) {
            conditions.push('sc.ngay_chieu = ?');
            params.push(date);
        }
        
        if (cinema_id) {
            conditions.push('rc.ma_rap = ?');
            params.push(cinema_id);
        }
        
        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }
        
        const result = await executeQuery(query, params);
        return result.map(row => new Showtime(row));
    }
    async getById(showtime_id){
        const room_result = await executeQuery(`
            SELECT ma_phong, ten_phong 
            FROM SuatChieu NATURAL JOIN PhongChieu 
            WHERE ma_suat_chieu=?
        `, [showtime_id]);
        /*
        +----------+-----------+
        | ma_phong | ten_phong |
        +----------+-----------+
        */
        const seat_result = await executeQuery(`SELECT R.ma_phong, hang_ghe, so_ghe, loai_ghe, 
                                                S.trang_thai FROM SuatChieu NATURAL JOIN PhongChieu R 
                                                INNER JOIN GheNgoi S ON R.ma_phong=S.ma_phong WHERE 
                                                ma_suat_chieu=?`, [showtime_id]);
        /*
        +----------+----------+--------+----------+------------+
        | ma_phong | hang_ghe | so_ghe | loai_ghe | trang_thai |
        +----------+----------+--------+----------+------------+
        */
        /*
        Expected:
        {
        "showtime_id": "SHO00001",
        "room": { "room_id": "...", "name": "..." },
        "seats": [
            {
            "room_id": "...",
            "seat_row": "A",
            "seat_column": 1,
            "seat_type": "normal",
            "state": "occupied", // Calculated: if ticket exists for this showtime+seat, then 'occupied', else 'available' (or 'broken' from SEAT table)
            "price": 85000 // Calculated based on seat_type and showtime rules
            },
            ...
        ]
        }
        */
        
        return {
            showtime_id: showtime_id,
            room: {
                room_id: room_result[0].ma_phong,
                name: room_result[0].ten_phong
            },
            seats: seat_result.map(row => this.createSeatInfo(row))
        };
    }
    // UTILS
    createSeatInfo(row){
        return {
            room_id: row.ma_phong,
            seat_row: row.hang_ghe,
            seat_column: row.so_ghe,
            seat_type: row.loai_ghe,
            state: row.trang_thai,
            //price:
        }
    }
}

module.exports = new ShowtimeService();