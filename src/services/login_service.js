const { executeQuery } = require("../models/connect_sql");
const jwt = require('jsonwebtoken');

class LoginService{
    async login(identifier, password){
        // verify user
        let userResult = null;
        if (identifier.includes('@')){
            // nếu là email thì verify trong tài khoản khách hàng thôi
            userResult = await executeQuery(`
                SELECT so_dien_thoai, email, ho_ten, ngay_sinh, gioi_tinh, anh_dai_dien, diem_tich_luy, ngay_dang_ky
                FROM TaiKhoan WHERE email=? 
            `, [identifier]);    
        }
        else {
            // nếu là sđt thì tìm trong cả 2
            userResult = await executeQuery(`
                SELECT so_dien_thoai, email, ho_ten, ngay_sinh, gioi_tinh, anh_dai_dien, diem_tich_luy, ngay_dang_ky
                FROM TaiKhoan WHERE so_dien_thoai=? 
            `, [identifier]);
        }
        const phone = userResult[0].so_dien_thoai;
        let role = 'user';
        // tìm loại tài khoản

        const roleResult =  await executeQuery(`
            SELECT ma_nhan_vien FROM NhanVien WHERE so_dien_thoai=?    
        `, [phone]);
        if (roleResult.length > 0) role = 'admin';

        const user = {
                phone_number: phone,   // PK
                email: userResult[0].email,
                fullname: userResult[0].ho_ten,
                birth_date: userResult[0].ngay_sinh,
                gender: userResult[0].gioi_tinh,
                avatar: userResult[0].anh_dai_dien,
                membership_points: userResult[0].diem_tich_luy,
                registration_date: userResult[0].ngay_dang_ky,
                role: role
            }

        const JWT_SECRET = process.env.JWT_SECRET || "conchocaobangbopc";
        const userPayload = {
            phone_number: phone
        };
        const token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: '24h' });

        return { token, user };
    }
    async register(phone, email, password, fullname, birthdate, gender){
        // tìm xem tài khoản đã tồn tại chưa
        const userResult = await executeQuery(`
            SELECT so_dien_thoai FROM TaiKhoan WHERE so_dien_thoai=? 
        `, [phone]);
        if (userResult.length > 0) throw new Error("An account with this phone number is already existed!");

        // nếu chưa thì tạo
        await executeQuery(`
            INSERT INTO TaiKhoan (so_dien_thoai, email, mat_khau, ho_ten, ngay_sinh, gioi_tinh)
            VALUES (?, ?, ?, ?, ?, ?);    
        `, [phone, email, password, fullname, birthdate, gender]);
    }
    async getMyInfo(phone){
        const result = await executeQuery(`
            SELECT * FROM TaiKhoan WHERE so_dien_thoai=? 
        `, [phone]);
    }
}

module.exports = new LoginService()