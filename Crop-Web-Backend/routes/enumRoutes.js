// routes/enumRoutes.js

const express = require("express");
const router = express.Router();
const { getEnumOptions } = require("../controllers/enumController");

router.get("/enumOptions", getEnumOptions);

module.exports = router;
