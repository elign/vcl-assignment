const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const updateStudentInfo = (req, res) => {
  if (!req.user) {
    return res.status(200).json("User Not Logged In!");
  } else if (req.user.userType === "Staff") {
    return res.status(500).json("Unauthorized Update");
  }
  const user = req.user;
  // resumeLink that we receive from user is just a simple link we'll add the timestamp here
  let { name, email, contactNumber, resumeLink } = req.body;
  name = name ? name : user.name;
  email = email ? email : user.email;
  contactNumber = contactNumber ? contactNumber : user.contactNumber;

  const update = {
    name,
    email,
    contactNumber,
  };

  // If we're getting resume link then we need to update the resume link and create a history
  // for the current resume link
  if (resumeLink != null) {
    const oldData = user?.currentResumeLink;
    // If there's upload history of the user then we'll use it otherwise we'll create new history.
    const newUploadHistory = user?.uploadHistory || [];
    if (oldData !== null) {
      newUploadHistory.push(oldData);
    }
    const currentResumeLink = {
      fileLink: resumeLink,
      timestamp: new Date(),
    };
    update.currentResumeLink = currentResumeLink;
    update.uploadHistory = newUploadHistory;
  }
  // Updating name, email, contact Number, and resume Link
  User.findByIdAndUpdate(req.user._id, update, { new: true })
    .then((updatedStudent) => {
      return res.status(200).json(updatedStudent);
    })
    .catch((err) => {
      return res.status(500).json({ error: "Internal server error" });
    });
};

const getStudentData = (req, res) => {
  if (!req.user) {
    return res.status(500).json("User Not Logged In!");
  } else if (req.user.userType === "Staff") {
    return res.status(500).json("Not authorized!");
  }
  return res.status(200).json(req.user);
};

module.exports = {
  updateStudentInfo,
  getStudentData,
};
