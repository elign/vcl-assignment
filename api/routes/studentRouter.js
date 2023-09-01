const router = require("express").Router();
const { verifyToken } = require("../middlewares/verifyToken");
const {
  loginStudent,
  signUpStudent,
  updateStudentInfo,
  getStudentData,
} = require("../controllers/studentController");

router.post("/signup", signUpStudent);
router.post("/login", loginStudent);
router.put("/", verifyToken, updateStudentInfo);
router.get("/", verifyToken, getStudentData);
module.exports = router;
