require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const { dbGet } = require("../config/database");

const checkLogin = async (username, password) => {
  try {
    if (!username || !password) {
      return {
        success: false,
        message: "Tài khoản và mật khẩu không được để trống",
      };
    }
    const account = undefined;
    // Truy vấn lấy thông tin so_dien_thoai , ho_ten luu vao TaiKhoan

    // nếu truy vấn không tồn tại TaiKhoan và trả về lỗi ngay bỏ qua hàm thực thi controlller
    if (!account) {
      return {
        success: false,
        message: "Tài khoản hoặc mật khẩu không chính xác",
      };
    }

    // Tạo token
    const token = jwt.sign(
      {
        sdt: account.so_dien_thoai,
        name: account.ho_ten,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
      // thời hạn token hiệu lực trong 24 h
    );

    return {
      success: true,
      message: "Đăng nhập thành công",
      token: token, // bat buoc 
      sdt: account.so_dien_thoai, // tùy yêu cầu
      name: account.ho_ten, // tùy yêu cầu
    };
  } catch (err) {
    return {
      success: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau",
    };
  }
};

module.exports = checkLogin;
