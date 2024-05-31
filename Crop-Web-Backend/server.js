const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./db");

const userRoutes = require("./routes/userRoutes");
const farmRoutes = require("./routes/farmRoutes");
const enumRoutes = require("./routes/enumRoutes");

const app = express();
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
