const router = require("express").Router();
const { verifyToken } = require("../middlewares/verifyToken");
const {
  updateStudentInfo,
  getStudentData,
} = require("../controllers/studentController");

router.put("/", verifyToken, updateStudentInfo);
router.get("/", verifyToken, getStudentData);
module.exports = router;
