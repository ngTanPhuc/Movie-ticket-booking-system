class Movie {
    constructor(data){
        this.id = data.ma_phim;
        this.title = data.ten_phim;
        this.duration = data.thoi_luong;
        this.releaseDate = data.ngay_khoi_chieu;
        this.endDate = data.ngay_ket_thuc;
        this.ageRating = data.do_tuoi;
        this.trailer = data.trailer;
        this.language = data.ngon_ngu;
        this.status = data.trang_thai;
        this.summary = data.tom_tat;
        this.image = data.hinh_anh;
    }
    // Nếu muốn format lại dates
    // Giả sử format date gốc là yy-mm-ddThh:mm:ss
    toJSON() {
        // return {
        //     id: this.id,
        //     title: this.title,
        //     duration: this.duration,
        //     releaseDate: this.releaseDate?.toISOString().split('T')[0], // Format: YYYY-MM-DD
        //     endDate: this.endDate?.toISOString().split('T')[0],
        //     ageRating: this.ageRating,
        //     trailer: this.trailer,
        //     language: this.language,
        //     status: this.status,
        //     summary: this.summary,
        //     image: this.image
        // };
        return {
            movie_id: this.id,
            name: this.title,
            duration: this.duration,
            release_date: this.releaseDate,
            end_date: this.endDate,
            age_rating: this.ageRating,
            trailer: this.trailer,
            language: this.language,
            status: this.status,
            synopsis: this.summary,
            image: this.image,
        };
    }
}

module.exports = Movie;