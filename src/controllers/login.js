const { executeQuery } = require("../models/connect_sql");
const checkLogin = require("../services/login");
class Login {
  async show(req, res) {
    try {
      // render HTML instead
      const movies = await executeQuery(`SELECT * FROM MOVIE;`);
      res.json({ success: true, data: movies });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
  async login(req, res) {
    const username = req.params.username;
    const password = req.params.password;
    const result = await checkLogin(username, password);
    if (!result.success) {
      res.status(401).json({ ...result });
    } else {
      res.status(200).json({ ...result });
    }
  }
}
module.exports = new Login();
