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
    const user = undefined;
    // Truy vấn lấy thông tin id , role : nếu có sử dụng và lưu vào user

    // nếu truy vấn không tồn tại user và trả về lỗi ngay bỏ qua hàm thực thi controlller
    if (!user) {
      return {
        success: false,
        message: "Tài khoản hoặc mật khẩu không chính xác",
      };
    }

    // Tạo token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
      // thời hạn token hiệu lực trong 24 h
    );

    return {
      success: true,
      message: "Đăng nhập thành công",
      token: token,
      id: user.id, // tùy yêu cầu có cần k
      role: user.role, // tùy yêu cầu có cần k
    };
  } catch (err) {
    return {
      success: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau",
    };
  }
};

module.exports = checkLogin;
