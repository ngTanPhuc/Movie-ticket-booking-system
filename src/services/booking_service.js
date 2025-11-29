//const { user } = require("../config/sql_server");
const { executeQuery } = require("../models/connect_sql");
// const Booking = require("../models/booking_model");
const { search } = require("../routes/booking_route");

class BookingService{
    
    async createBooking(userPhone, showtimeId, seats, foods, voucherId){
        const PRICE = 75000;
        // Bước 0: kiểm tra tính hợp lệ của các thành phần
        let total = 0;
        for (const s of seats){
            const seatCheck = await executeQuery(`
                SELECT R.ma_phong, hang_ghe, so_ghe, loai_ghe, S.trang_thai 
                FROM SuatChieu NATURAL JOIN PhongChieu R 
                INNER JOIN GheNgoi S ON R.ma_phong=S.ma_phong 
                WHERE ma_suat_chieu=? AND hang_ghe=? AND so_ghe=?
            `, [showtimeId, s.row, s.col]);
            if (seatCheck.length <= 0){
                throw new Error("Illegal seat!");
            }
            total += s.price;
        }
        // Tổng hợp giá tiền
        if (foods){
            for (const f in foods){
                total += f.price;
            }
        }
        // Bước 1: create bill
        let result = executeQuery(`
            INSERT INTO HoaDon (so_dien_thoai, ngay_tao, tong_tien)
            VALUES (?, ?, ?)
        `, [userPhone, this.getCurrentDateTimeStr(), total]);
        // get bill id
        result = executeQuery("SELECT ma_hoa_don FROM HoaDon ORDER BY ma_hoa_don DESC LIMIT 1");
        const billId = result[0].ma_hoa_don;

        // bước 2: create ticket
        // get info to create ticket
        result = executeQuery(`
            SELECT ten_phim, ma_suat_chieu, ngay_chieu, gio_ket_thuc, ma_phong
            FROM SuatChieu NATURAL JOIN Phim
            WHERE ma_suat_chieu=?
        `, [showtimeId]);
        const movieName = result[0].ma_suat_chieu;
        const creationDatetime = this.getCurrentDateTimeStr();
        const expireDate = result[0].ngay_chieu;
        const expireTime = result[0].gio_ket_thuc;
        const roomId = result[0].ma_phong;
        // add
        for (const s of seats){
            result = executeQuery(`
                INSERT INTO Ve
                VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)    
            `, [movieName, s.price, creationDatetime, expireDate + " " + expireTime, billId, roomId, s.row, s.col, showtimeId]);
        }

        // Bước 3: create food if any
        for (const f of foods){
            result = executeQuery(`
                INSERT INTO DoAn (ma_hoa_don, ten_do_an, gia_ban)
                VALUES (?, ?, ?)    
            `, [billId, f.name, f.price*f.quantity]);
        }
        // Bước 4-5: update voucher & tính tổng cuối cùng
        if (voucherId){
            // implement voucher logic into price.
            // Default: 10% off
            total *= 0.9;
            result = executeQuery(`
                UPDATE HoaDon
                SET tong_tien=?
                WHERE ma_hoa_don=?
                `, [total, billId]);
            result = executeQuery(`
                UPDATE Voucher
                SET trang_thai='used'
                WHERE ma_voucher=?    
            `, [voucherId]);
        }
        
        // Tạo Bill object để return 
        return new Bill(billId, userPhone, creationDatetime, total);       
        
    }
    async getHistory(phone){
        const result = await executeQuery(`
            SELECT * FROM HoaDon WHERE so_dien_thoai=? ORDER BY ma_hoa_don DESC
        `, [phone]);
        return result.map(row => new Bill(row.ma_hoa_don, row.so_dien_thoai, row.ngay_tao, row.tong_tien));
    }
    getCurrentDateTimeStr() {
        const now = new Date();
        return now.getFullYear() + "-"
            + String(now.getMonth() + 1).padStart(2, "0") + "-"
            + String(now.getDate()).padStart(2, "0") + " "
            + String(now.getHours()).padStart(2, "0") + ":"
            + String(now.getMinutes()).padStart(2, "0") + ":"
            + String(now.getSeconds()).padStart(2, "0");
    }
}

module.exports = new BookingService();