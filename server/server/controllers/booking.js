const jwt = require("jsonwebtoken");
const bookingModel = require("../models/bookingModel");

class booking {
  create_booking = async (req, res) => {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decodeUser = jwt.verify(token, process.env.jwt_secret_key);
    let { id } = decodeUser;
    const {
      places,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      address,
      phone,
      email,
      price,
    } = req.body;

    try {
      const saveBooking = await bookingModel.create({
        places,
        user: id,
        checkIn,
        checkOut,
        numberOfGuests,
        name,
        address,
        phone,
        email,
        price,
      });
      res
        .status(201)
        .json({ message: "Your Booking Save Successfully.", saveBooking });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  getAll_booking = async (req, res) => {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const decodeUser = jwt.verify(token, process.env.jwt_secret_key);
    const { id } = decodeUser;
    const allBooking = await bookingModel.find({ user: id }).populate("places");

    res.status(200).json(allBooking);
  };
}

module.exports = new booking();
