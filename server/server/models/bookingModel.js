const { model, Schema } = require("mongoose");
const bookingSchema = new Schema({
  places: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "places",
  },
  user: {
    type: Schema.Types.ObjectId,
    require: true,
  },
  checkIn: {
    type: Date,
    require: true,
  },
  checkOut: {
    type: Date,
    require: true,
  },
  numberOfGuests: {
    type: Number,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
});
module.exports = model("booking", bookingSchema);
