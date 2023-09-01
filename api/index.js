const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT || 4000;
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  optionsSuccessStatus: 200,
};

const studentRouter = require("./routes/studentRouter");
const staffRouter = require("./routes/staffRouter");


const app = express();
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

try {
  mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("Connected to DB successfully!");
  let today = new Date();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  console.log(time);
} catch (err) {
  console.error("Error occurred while connecting to DB", err);
}

app.listen(port, () => console.log(`Backend listening on port ${port}`));

app.use("/student", studentRouter);
app.use("/staff", staffRouter);


