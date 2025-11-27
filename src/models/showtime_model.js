class Showtime {
    constructor(data){
        this.id = data.ma_suat_chieu;
        this.date = data.ngay_chieu;
        this.startTime = data.gio_bat_dau;
        this.endTime = data.gio_ket_thuc;
        this.room = data.ten_phong;
        this.name = data.ten_rap;
        this.status = data.trang_thai;
        this.address = data.dia_chi;
        
    }
    toJSON() {
        return {
            id: this.id,
            date: this.date,
            startTime: this.startTime ,
            endTime: this.endTime,
            room: this.room,
            name: this.name,
            status: this.status,
            address: this.address
        };
    }
}

module.exports = Showtime;