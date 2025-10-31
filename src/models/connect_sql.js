const mysql = require("mysql2/promise");

const dbConfig = require("../config/sql_server");

const pool = mysql.createPool(dbConfig);

async function connectDB() {
  try {
    const connection = await pool.getConnection();
    console.log("Kết nối thành công");
    connection.release();
  } catch (error) {
    console.error("Lỗi kết nối:", error.message);
  }
}

async function executeQuery(sql, params = []) {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error("Lỗi thực thi:", error.message);
    throw error;
  }
}

module.exports = {
  connectDB,
  executeQuery,
  pool,
};
