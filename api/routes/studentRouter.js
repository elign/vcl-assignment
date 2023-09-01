const router = require("express").Router();
const { verifyToken } = require("../middlewares/verifyToken");
const {
  loginStudent,
  signUpStudent,
  updateStudentInfo,
  getAllStudentsData,
} = require("../controllers/studentController");

router.post("/signup", signUpStudent);
router.post("/login", loginStudent);
router.put("/", verifyToken, updateStudentInfo);
module.exports = router;
