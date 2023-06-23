require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");





const app = express();


// Middleware
app.use(express.json()); // parse json bodies in the request object
app.use(cors());
app.use(express.static('public'))






//Routs
app.use("/articles", require("./routes/articlesRoutes"));
app.use("/alerts", require("./routes/alertsRoutes"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/profile", require("./routes/profileRoutes"));
app.use("/admin", require("./routes/adminRoutes"));




// Global Error
app.use((err, req, res, next) => {
  // console.log(err.stack);
  // console.log(err.name);
  // console.log(err.code);
  if (err.message == 'הקובץ חייב להיות בפורמטים הבאים: (png, jpg, jpeg)') {
    return res.status(400).json({ message: err.message });
  };

  if (err.message == 'הקובץ חורג מהגודל המרבי המותר של 2MB') {
    return res.status(400).json({ message: err.message });
  };

  res.status(500).json({
    message: "Something went rely wrong",
  });
});

// Listen on pc port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
