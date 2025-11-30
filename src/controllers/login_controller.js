const LoginService = require("../services/login_service");

class LoginController {
  async login(req, res) {
    try{
        const identifier = req.body.identifier; // can be email or phone
        const password = req.body.password;

        const token = await LoginService.login(identifier, password);
        res.json({ success: true, data: token });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
  }
  async register(req, res){
    try {
      const phone = req.body.phone_number;
      const email = req.body.email;
      const password = req.body.password;
      const fullname = req.body.fullname;
      const birthdate = req.body.birth_date;
      const gender = req.body.gender;

      await LoginService.register(phone, email, password, fullname, birthdate, gender);
      res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
  }
  async getMyInfo(req, res){
    try {
      const phone = req.user.phone_number; // From JWT payload
      const result = await LoginService.getMyInfo(phone);
      res.json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
  }
  
}
module.exports = new LoginController();
