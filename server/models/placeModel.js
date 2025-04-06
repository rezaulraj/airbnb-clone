const { model, Schema } = require("mongoose");

const placeSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  title: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  photos: {
    type: [String],
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  perks: {
    type: [String],
    require: false,
  },
  extraInfo: {
    type: String,
    require: true,
  },
  checkIn: {
    type: Number,
    require: true,
  },
  checkOut: {
    type: Number,
    require: true,
  },
  maxGuests: {
    type: Number,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
});

module.exports = model("places", placeSchema);
