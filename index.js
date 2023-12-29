const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const studentRoutes = require("./routes/student.js");
const adminRoutes = require("./routes/admin.js");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/student", studentRoutes);
app.use("/api/admin", adminRoutes);

dotenv.config();
const PORT = process.env.PORT || 5001;
mongoose
  .connect(process.env.MONGODB_URL, {})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Database connection error: ", error);
  });
