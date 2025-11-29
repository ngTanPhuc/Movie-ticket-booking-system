const BookingService = require("../services/booking_service")
class BookingController {
    async createBooking(req, res) {
        try{
            const userPhone = req.user.phone;  // đây có phải cách lấy param từ JWT token?
            // const bearer = req.header['bearer'];
            const showtimeId = req.body.showtime_id;
            const seats = req.body.seats;
            const foods = req.body.foods || [];
            const voucherId = req.body.voucher_code || null;
            // const { showtime_id, seats, foods, voucher_code } = req.body;

            // Create booking
            const booking = await bookingService.createBooking(userPhone, showtimeId, seats, foods, voucher_code);
            res.json({ success: true, data: booking });
        } catch (error) {
            res.status(500).json({success: false, error: error.message});
        }    
        
    }
    async getHistory(req, res){
        try {
            const userPhone = req.user.phone; 
            const history = await bookingService.getHistory(userPhone);
            res.json({ success: true, data: history });
        } catch (error) {
            res.status(500).json({success: false, error: error.message});
        }    
    }
}

module.exports = new BookingController();
