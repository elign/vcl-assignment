const router = require("express").Router();
const {
  loginUser,
  signUpUser,
  getUserProfile,
} = require("../controllers/userController");
const { verifyToken } = require("../middlewares/verifyToken");
router.post("/signup", signUpUser);
router.post("/login", loginUser);
router.get("/profile", verifyToken, getUserProfile);

module.exports = router;
