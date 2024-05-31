// routes/farmRoutes.js

const express = require("express");
const router = express.Router();
const { addFarm, getAllFarms } = require("../controllers/farmController");

router.post("/addFarm", addFarm);
router.get("/getAllFarms", getAllFarms);

module.exports = router;
