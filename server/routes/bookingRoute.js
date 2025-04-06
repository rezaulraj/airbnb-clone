const booking = require("../controllers/booking");

const router = require("express").Router();

router.post("/api/booking", booking.create_booking);
router.get("/api/allbooking", booking.getAll_booking);

module.exports = router;
