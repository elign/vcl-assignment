const router = require("express").Router();
const { pdfFileUploader } = require("../controllers/fileUploadController");
// Setting up multer as middleware to grab pdf uploads
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
router.post("/", upload.single("filename"), pdfFileUploader);
module.exports = router;
