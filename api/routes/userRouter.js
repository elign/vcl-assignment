const router = require("express").Router();
const { loginUser, signUpUser } = require("../controllers/userController");

router.post("/signup", signUpUser);
router.post("/login", loginUser);
module.exports = router;
