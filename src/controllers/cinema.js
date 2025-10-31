const { executeQuery } = require("../models/connect_sql");
class cinema {
  async show(req, res) {
     try {
        const movies = await executeQuery(`SELECT * FROM MOVIE;`);
        res.json({ success: true, data: movies });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
  }
}
module.exports = new cinema();
