const Farm = require("../models/farmModel")

const addFarm = async (req, res) => {
  try {
    const {
      memberNumber,
      memberName,
      contractType,
      sugarcaneBreed,
      surveyNo,
      plotName,
      waterSupplyType,
      laganType,
      laganDate,
      waterSource,
      sariDistance,
      totalArea,
      polygonCoordinates,
      screenshotURI, // Add screenshotURI to the destructured req.body
    } = req.body;

    const farm = await Farm.create({
      memberNumber,
      memberName,
      contractType,
      sugarcaneBreed,
      surveyNo,
      plotName,
      waterSupplyType,
      laganType,
      laganDate,
      waterSource,
      sariDistance,
      totalArea,
      polygonCoordinates,
      screenshotURI, // Include screenshotURI in the farm creation
    });

    res.json({ success: true, message: "Farm added successfully", farm });
  } catch (error) {
    console.error("Error adding farm:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getAllFarms = async (req, res) => {
  try {
    const farms = await Farm.find();
    res.json(farms);
  } catch (error) {
    console.error("Error fetching farms:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  addFarm,
  getAllFarms,
};
