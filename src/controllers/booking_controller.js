const BookingService = require("../services/booking_service")
class BookingController {
    // async getAll(req, res){
    //     try {
    //         const movie_id = req.query.movie_id;
    //         const date = req.query.date || null;
    //         const cinema_id = req.query.cinema_id || null;

    //         const bookings = await BookingService.getAll(movie_id, date, cinema_id);
    //         res.json({ success: true, data: bookings });
    //     } catch (error) {
    //         res.status(500).json({success: false, error: error.message});
    //     }
    // }
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
