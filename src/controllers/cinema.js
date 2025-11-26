const { executeQuery } = require("../models/connect_sql");
class Cinema {
  // Trong HTML có nút/link để redirect vào chức năng CRUD của từng phim theo id
  async showAll(req, res) {
     try {
        const movies = await executeQuery(`SELECT * FROM Phim;`);
        res.json({ success: true, data: movies });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
  }
  async renderSearchPage(req, res) {
    try {
      // render search page HTML
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
  async search(req, res) {
    try {
      const name = req.params.name;
      const result = await executeQuery(`SELECT ten_phim, ngay_bat_dau, ngay_ket thuc FROM Phim WHERE ten_phim LIKE ${name}`);
      res.json({success: true, data: result});
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
  async add(req, res) {
    try {
      const data = req.body;
      // somehow extract from data
      const result = await executeQuery(`INSERT INTO Phim VALUES (${id}, ${name}, ${duration}, ${start_date}, ${end_date}, ${age}, ${trailer}, ${lang}, ${status}, ${summary})`);
      res.json({success: true, data: result});
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    } 
  } 
  async retrieve(req, res) {
    try {
      const id = req.params.id;
      const result = await executeQuery(`SELECT * FROM Phim WHERE id=${id}`);
      res.json({success: true, data: result});
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
  async remove(req, res) {
    try {
      const id = req.params.id;
      const result = await executeQuery(`DELETE FROM Phim WHERE ma_phim=${id}`);
      res.json({success: true, data: result});
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
  async update(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      let updates = {};
      const ALLOWED_FIELDS = [
        "ten_phim",
        "thoi_luong",
        "ngay_khoi_chieu",
        "ngay_ket_thuc",
        "do_tuoi",
        "trailer",
        "ngon_ngu",
        "trang_thai",
        "tom_tat"
      ];
      for (const [key, value] of Object.entries(data)){
        if (ALLOWED_FIELDS.includes(key)){
          updates[key] = value;
        }
      }
      if (Object.keys(filteredUpdates).length === 0) {throw new Error('No valid fields to update');} // ghi tạm
      const setClause = Object.keys(filteredUpdates) // tạo set clause từ các cặp key - value
        .map(([key, value]) => `${key}=${value}`)
        .join(', ');
      // Tạo giá trị để 
      const result = await executeQuery(`UPDATE Phim SET ${setClause} WHERE ma_phim=${id}`);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

}

module.exports = new Cinema();
