const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Staff = require("../models/staffModel");
const Student = require("../models/studentModel");

const signUpStaffMember = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userDoc = await Staff.create({
      name,
      email,
      password: bcrypt.hashSync(password, 4),
    });
    res.status(200).json(userDoc);
  } catch (error) {
    console.log(error);
    res.status(422).json("Staff Member could not be created.");
  }
};

const loginStaffMember = async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await Staff.findOne({ email });

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
    res.status(404).json("Staff Member not found");
  }
};

const getAllStudentsData = async (req, res) => {
  if (!req.user) {
    return res.status(200).json("User Not Logged In!");
  }
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = {
  signUpStaffMember,
  loginStaffMember,
  getAllStudentsData,
};
