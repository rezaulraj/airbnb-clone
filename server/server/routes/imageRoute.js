const imageUpload = require("../controllers/imageUpload");
const multer = require("multer");
const photosMiddleware = multer({ dest: "uploads/" });
const router = require("express").Router();

router.post("/api/upload-by-link", imageUpload.image_upload_by_link);
router.post(
  "/api/uploads",
  photosMiddleware.array("photos", 100),
  imageUpload.image_uploads
);

module.exports = router;
