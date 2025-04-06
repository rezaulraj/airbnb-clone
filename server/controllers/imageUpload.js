const imageDownloader = require("image-downloader");
const path = require("path");
const fs = require("fs");
class uploader {
  image_upload_by_link = async (req, res) => {
    const { link } = req.body;
    const newName = "photo" + Date.now() + ".jpg";
    try {
      await imageDownloader.image({
        url: link,
        dest: path.join(__dirname, "../uploads", newName),
      });
      res.json({
        message: "upload successful",
        filepath: newName,
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  image_uploads = async (req, res) => {
    const uploadedFiles = [];
    try {
      for (let i = 0; i < req.files.length; i++) {
        const { path: filePath, originalname } = req.files[i];
        const parts = originalname.split(".");
        const ext = parts[parts.length - 1];
        const newPath = filePath + "." + ext;
        fs.renameSync(filePath, newPath);
        uploadedFiles.push(path.basename(newPath)); // Use basename to ignore the 'uploads\\' part
      }
      res
        .status(201)
        .json({ message: "uploaded successfully", filenames: uploadedFiles });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  };
}
module.exports = new uploader();
