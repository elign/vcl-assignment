const router = require("express").Router();
const {verifyToken} = require("../middlewares/verifyToken")
const {
  loginStaffMember,
  signUpStaffMember,
  getAllStudentsData,
} = require("../controllers/staffController");

router.post("/signup", signUpStaffMember);
router.post("/login", loginStaffMember);
router.get("/students", verifyToken, getAllStudentsData);
module.exports = router;
