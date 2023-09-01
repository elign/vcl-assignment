const router = require("express").Router();
const {
  loginStudent,
  signUpStudent,
} = require("../controllers/studentController");

router.post("/signup", signUpStudent);
router.post("/login", loginStudent);
module.exports = router;