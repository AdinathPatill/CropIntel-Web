// controllers/enumController.js

const { ContractType, SugarcaneBreed, WaterSupplyType, LaganType, WaterSource, SariDistance } = require("../models/enumModels");

const getEnumOptions = async (req, res) => {
  try {
    const contractTypes = await ContractType.find();
    const sugarcaneBreeds = await SugarcaneBreed.find();
    const waterSupplyTypes = await WaterSupplyType.find();
    const laganTypes = await LaganType.find();
    const waterSourceOptions = await WaterSource.find();
    const sariDistanceOptions = await SariDistance.find();

    res.json({
      contractTypes,
      sugarcaneBreeds,
      waterSupplyTypes,
      laganTypes,
      waterSourceOptions,
      sariDistanceOptions,
    });
  } catch (error) {
    console.error("Error fetching enum options:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  getEnumOptions,
};
