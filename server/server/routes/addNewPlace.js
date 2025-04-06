const router = require("express").Router();
const createPlace = require("../controllers/createPlace");
router.post("/api/newplace", createPlace.add_place);
router.get("/api/user-places", createPlace.get_places);
router.get("/api/places/:id", createPlace.get_update_data);
router.put("/api/updateplace", createPlace.update_place);
router.get("/api/places",createPlace.get_all_place)
module.exports = router;
