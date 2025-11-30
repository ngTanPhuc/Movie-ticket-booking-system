const { executeQuery } = require("../models/connect_sql");
const Movie = require("../models/movie_model");
const MovieDetail = require("../models/movie_detail");

class MovieService{
    async getAll(status = null){
        let optionalClause = "";
        if (status){
            optionalClause = ` WHERE trang_thai='${status}'`;
        }
        const result = await executeQuery(`SELECT * FROM Phim ${optionalClause}`);
        // Chuyển đổi mỗi row thành Movie object. Lưu ý: result là một array các kết quả
        //return result;
        return result.map(row => new Movie(row));
    }
    async getById(id){
        console.log("get by id:" + id);
        const movies = await executeQuery(`SELECT * FROM Phim WHERE ma_phim='${id}'`);
        if (movies.length <= 0){
            return null;
        }
        const directors = await executeQuery(`SELECT ten_dao_dien FROM DaoDien WHERE ma_phim='${id}'`);
        const actors = await executeQuery(`SELECT ten_dien_vien FROM DienVien WHERE ma_phim='${id}'`);
        const ratings = await executeQuery(`SELECT COUNT(*) AS count, SUM(so_sao) AS total_stars FROM DanhGiaPhim WHERE ma_phim='${id}'`);
        const reviews = await executeQuery(`SELECT noi_dung_danh_gia FROM DanhGiaPhim WHERE ma_phim='${id}'`);
        
        let avgRating = 0;
        if (ratings.length > 0){
            avgRating = ratings[0].total_stars / ratings[0].count;
        }

        const director_list = directors.map(row => row.ten_dao_dien);
        const actor_list = actors.map(row => row.ten_dien_vien);
        const review_list = reviews.map(row => row.noi_dung_danh_gia);
        // const result = {
        //     movies: movies[0], 
        //     director: director_list, 
        //     actor: actor_list, 
        //     avgRating: avgRating, 
        //     review: review_list
        // };
        const result = new MovieDetail(movies[0], director_list, actor_list, avgRating, review_list);
        return result;
    }
    async getTopRevenue(){
        console.log("get top revenue");
        const result = await executeQuery   (`SELECT 
                                                ten_phim,
                                                SUM(gia_ve) AS tong_doanh_thu
                                            FROM Ve
                                            GROUP BY ten_phim
                                            HAVING SUM(gia_ve) = (
                                                SELECT MAX(t.doanh_thu)
                                                FROM (
                                                    SELECT SUM(gia_ve) AS doanh_thu
                                                    FROM Ve
                                                    GROUP BY ten_phim
                                                ) AS t
                                            )`);
        //if (result.length<=0){return null;}
        console.log(result);
        return result;
    }
}

module.exports = new MovieService()