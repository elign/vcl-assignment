const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Student = require("../models/studentModel");

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

const updateStudentInfo = (req, res) => {
  if (!req.user) {
    return res.status(200).json("User Not Logged In!");
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
  Student.findByIdAndUpdate(req.user._id, update, { new: true })
    .then((updatedStudent) => {
      return res.status(200).json(updatedStudent);
    })
    .catch((err) => {
      return res.status(500).json({ error: "Internal server error" });
    });
};

module.exports = {
  signUpStudent,
  loginStudent,
  updateStudentInfo,
};
