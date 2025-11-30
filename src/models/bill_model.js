class Bill {
    constructor(id, phone, creationDatetime, total){
        this.id = id;
        this.phone = phone;
        this.creationDatetime = creationDatetime;
        this.total = total;
    }
    toJSON(){
        return {
            id: this.id,
            phone: this.phone,
            createdAt: this.creationDatetime,
            total: this.total
        };
    }
}
module.exports = Bill;