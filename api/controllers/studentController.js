const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Student = require("../models/StudentModel");

const signUpStudent = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userDoc = await Student.create({
      name,
      email,
      password: bcrypt.hashSync(password, 4),
    });
    res.status(200).json(userDoc);
  } catch (error) {
    console.log(error);
    res.status(422).json("User could not be created.");
  }
};

const loginStudent = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  const userDoc = await Student.findOne({ email });

  if (userDoc) {
    const passwordIsValid = bcrypt.compareSync(password, userDoc.password);

    if (passwordIsValid) {
      jwt.sign(
        { id: userDoc._id },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) {
            return res.status(500).json("Internal Server Error");
          }

          // Set the cookie
          res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
          });
          // Send the JSON response
          res.status(200).json({ message: "Login Successful" });
        }
      );
    } else {
      res.status(401).json({
        accessToken: null,
        message: "Invalid Password",
      });
    }
  } else {
    res.status(404).json("User not found");
  }
};

module.exports = {
  signUpStudent,
  loginStudent,
};
