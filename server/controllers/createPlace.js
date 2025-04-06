const placeModel = require("../models/placeModel");
const jwt = require("jsonwebtoken");

class plaseUplader {
  add_place = async (req, res) => {
    const { token } = req.cookies;
    const {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body;

    if (token) {
      const decodeUser = await jwt.verify(
        token,
        process.env.jwt_secret_key,
        {}
      );
      const placeUpload = await placeModel.create({
        owner: decodeUser.id,
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      res.status(201).json({ message: "New Place Uploaded", placeUpload });
    }
  };

  // ==== get places data on single user ============

  get_places = async (req, res) => {
    try {
      const { token } = req.cookies;
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      const decodeUser = jwt.verify(token, process.env.jwt_secret_key);
      const { id } = decodeUser;

      const places = await placeModel.find({ owner: id });
      return res.status(200).json({ length: places.length, places });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error retrieving places", error });
    }
  };

  // update get single place data
  get_update_data = async (req, res) => {
    const { id } = req.params;
    const data = await placeModel.findById(id);
    res.status(200).json(data);
  };

  // update place data
  update_place = async (req, res) => {
    const { token } = req.cookies;
    const {
      id,
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decodeUser = jwt.verify(token, process.env.jwt_secret_key);
    const placeDoc = await placeModel.findById(id);
    // console.log(decodeUser.id);
    // console.log(placeId.owner.toString());
    if (decodeUser.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      const updatePlace = await placeDoc.save();
      console.log(updatePlace);
      res.status(201).json({ message: "Update Successfull", updatePlace });
    }
  };

  // ============get all uploaded data==========
  get_all_place = async (req, res) => {
    try {
      const getData = await placeModel.find().populate("owner");
      res.status(200).json(getData);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

module.exports = new plaseUplader();
