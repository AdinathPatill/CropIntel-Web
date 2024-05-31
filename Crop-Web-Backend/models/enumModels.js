// models/enumModels.js

const mongoose = require("mongoose");

const enumSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

const ContractType = mongoose.model("ContractType", enumSchema);
const SugarcaneBreed = mongoose.model("SugarcaneBreed", enumSchema);
const WaterSupplyType = mongoose.model("WaterSupplyType", enumSchema);
const LaganType = mongoose.model("LaganType", enumSchema);
const WaterSource = mongoose.model("WaterSource", enumSchema);
const SariDistance = mongoose.model("SariDistance", enumSchema);

module.exports = {
  ContractType,
  SugarcaneBreed,
  WaterSupplyType,
  LaganType,
  WaterSource,
  SariDistance
};
