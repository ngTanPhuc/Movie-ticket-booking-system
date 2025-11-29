const { executeQuery } = require("../models/connect_sql");
// const Event = require("../models/event");

class AdminService{
    async getStats(){
        // const result = await executeQuery(`
        //     -- ghi gì vào đây để gọi procedure, ví dụ sp_GetMonthlyRevenue ?
        // `);
        const raw_movieCount = await executeQuery("SELECT COUNT(ma_phim) AS count FROM Phim");
        const raw_showingCount = await executeQuery("SELECT COUNT(ma_phim) AS count FROM Phim WHERE trang_thai='showing'");
        const raw_commingSoonCount = await executeQuery("SELECT COUNT(ma_phim) AS count FROM Phim WHERE trang_thai='upcoming'");
        const raw_totalCinemaCount = await executeQuery("SELECT COUNT(ma_rap) AS count FROM RapChieu");
        // tính 2 con số dưới đây thế nào?
        // const monthlyRevenue = await executeQuery("") 
        // const bookingThisMonth = 
        const movieCount = this.getCountNumber(raw_movieCount);
        const showingCount = this.getCountNumber(raw_showingCount);
        const commingSoonCount = this.getCountNumber(raw_commingSoonCount);
        const totalCinemaCount = this.getCountNumber(raw_totalCinemaCount);
        return {
            "total_movies": movieCount,
            "now_showing": showingCount,
            "coming_soon": commingSoonCount,
            "total_cinemas": totalCinemaCount,
            "monthly_revenue": 50000000,
            "bookings_this_month": 120
        }
    }
    getCountNumber(countTable){
        return countTable[0].count;
    }
    async createMovie(title, duration, releaseDate, endDate, ageRating, trailer, language, status, summary){
        const result = await executeQuery(`
            INSERT INTO Phim
            VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `[title, duration, releaseDate, endDate, ageRating, trailer, language, status, summary]);
    }
    async updateMovie(id, title, duration, releaseDate, endDate, ageRating, trailer, language, status, summary){
        // const result = await executeQuery(`
        //     UPDATE Phim
        //     SET ...
        //     WHERE ma_phim=?    
        // `, [id]);
        // Map tham số với tên cột trong database
        const fieldMap = {
            title: 'ten_phim',
            duration: 'thoi_luong',
            releaseDate: 'ngay_khoi_chieu',
            endDate: 'ngay_ket_thuc',
            ageRating: 'do_tuoi',
            trailer: 'trailer',
            language: 'ngon_ngu',
            status: 'trang_thai',
            summary: 'tom_tat'
        };

        // Object chứa các giá trị cần update
        const updates = {
            title,
            duration,
            releaseDate,
            endDate,
            ageRating,
            trailer,
            language,
            status,
            summary
        };

        // Lọc các trường không null/undefined
        const fieldsToUpdate = [];
        const values = [];

        for (const [key, value] of Object.entries(updates)) {
            if (value !== null && value !== undefined) {
                fieldsToUpdate.push(`${fieldMap[key]} = ?`);
                values.push(value);
            }
        }

        // Kiểm tra có trường nào để update không
        if (fieldsToUpdate.length === 0) {
            throw new Error('No fields to update');
        }

        // Thêm id vào cuối mảng values
        values.push(id);

        // Tạo câu query
        const query = `
            UPDATE Phim
            SET ${fieldsToUpdate.join(', ')}
            WHERE ma_phim = ?
        `;

        const result = await executeQuery(query, values);
        //return result;
    }
}

module.exports = new AdminService();