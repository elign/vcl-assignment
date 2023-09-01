const router = require("express").Router();
const {
  loginStaffMember,
  signUpStaffMember,
} = require("../controllers/staffController");

router.post("/signup", signUpStaffMember);
router.post("/login", loginStaffMember);
module.exports = router;
