const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const { firebaseConfig } = require("../config/firebase");

// Initialize firebase application
initializeApp(firebaseConfig);
// Initialize Cloud Storage
const storage = getStorage();

const pdfFileUploader = async (req, res) => {
  try {
    if (req.file.mimetype !== "application/pdf") {
      throw new Error("Invalid file type. Please upload PDF.");
    }
    if (req.file.size > 2 * 1024 * 1024) {
      throw new Error("File size should be lesser that 2 MB");
    }
    const dateTime = getCurrentDateTime();
    const storageRef = ref(storage, `vcl/${req.file.originalname + dateTime}`);
    // File metadata including the content type
    const metadata = {
      contentType: req.file.mimeType,
    };
    // Uploading file in the bucket storage
    const snapshot = await uploadBytesResumable(
      storageRef,
      req.file.buffer,
      metadata
    );
    // By using uploadBytesResumable we can control the progress of uploading like pause, resume, etc.

    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log("File uploaded successfully");
    return res.status(200).json({
      name: req.file.originalname,
      message: "file uploaded to firebase storage",
      type: req.file.mimeType,
      resumeLink: downloadURL,
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

function getCurrentDateTime() {
  const currentDate = new Date();
  return currentDate.toISOString(); // Returns date and time in ISO format
}
module.exports = {
  pdfFileUploader,
};
