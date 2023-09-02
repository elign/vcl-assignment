const router = require("express").Router();
const {verifyToken} = require("../middlewares/verifyToken")
const {
  getAllStudentsData,
} = require("../controllers/staffController");

router.get("/students", verifyToken, getAllStudentsData);
module.exports = router;
