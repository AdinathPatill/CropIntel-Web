const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import cors package
require("dotenv").config();
require("./db");

const userRoutes = require("./routes/userRoutes");
const farmRoutes = require("./routes/farmRoutes");
const enumRoutes = require("./routes/enumRoutes");

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json());

app.use("/api/user", userRoutes);
app.use("/api/farm", farmRoutes);
app.use("/api/enum", enumRoutes);

app.get("/", (req, res) => {
  res.send("Hello there");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
