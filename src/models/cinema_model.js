class Cinema {
    constructor(data){
        this.id = data.ma_rap;
        this.name = data.ten_rap;
        this.status = data.trang_thai;
        this.address = data.dia_chi;
        
    }
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            status: this.status,
            address: this.address
        };
    }
}

module.exports = Cinema;