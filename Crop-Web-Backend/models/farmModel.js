const mongoose = require("mongoose");

const farmSchema = new mongoose.Schema({
  memberNumber: { type: Number, required: true },
  memberName: { type: String, required: true },
  contractType: { type: mongoose.Schema.Types.Mixed, required: true },
  sugarcaneBreed: { type: mongoose.Schema.Types.Mixed, required: true },
  waterSupplyType: { type: mongoose.Schema.Types.Mixed, required: true },
  laganType: { type: mongoose.Schema.Types.Mixed, required: true },
  waterSource: { type: mongoose.Schema.Types.Mixed, required: true },
  sariDistance: { type: mongoose.Schema.Types.Mixed, required: true },
  surveyNo: { type: Number, required: true },
  plotName: { type: String, required: true },
  laganDate: { type: Date, required: true },
  totalArea: { type: String, required: true },
  polygonCoordinates: { type: [{ latitude: Number, longitude: Number }], required: true },
  screenshotURI: { type: String, required: true }, // Added screenshotURI field
}, { timestamps: true });

module.exports = mongoose.model("Farm", farmSchema);
