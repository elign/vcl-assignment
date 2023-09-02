const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const getAllStudentsData = async (req, res) => {
  if (!req.user) {
    return res.status(200).json("User Not Logged In!");
  } else if(req.user.userType === 'Student') {
    return res.status(500).json("You're not authorized to get this information!")
  }
  try {
    const students = await User.find({ userType: 'Student' });
    res.status(200).json(students);
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = {
  getAllStudentsData,
};
