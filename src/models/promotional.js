class Promotional{
    constructor(data){
        this.promotionId = data.ma_khuyen_mai;
        this.eventId = data.ma_su_kien;
        //this.name = data.ten_su_kien;
        this.description = data.mo_ta;
        this.startDate = data.ngay_bat_dau;
        this.endDate = data.ngay_ket_thuc;
        this.level = data.cap_do;
    }
    toJSON(){
        return {
            promotionId: this.promotionId,
            eventId: this.eventId,
            description: this.description,
            startDate: this.startDate,
            endDate: this.endDate,
            level: this.level
        }
    }
}

module.exports = Promotional;