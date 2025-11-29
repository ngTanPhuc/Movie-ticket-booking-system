class Event{
    constructor(data){
        this.id = data.ma_su_kien;
        this.name = data.ten_su_kien;
        this.description = data.mo_ta;
        this.startDate = data.ngay_bat_dau;
        this.endDate = data.ngay_ket_thuc;
    }
    toJSON(){
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            startDate: this.startDate,
            endDate: this.endDate
        }
    }
}

module.exports = Event;