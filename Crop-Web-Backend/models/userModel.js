const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullname: {
      type: String,
    },
    mobileNumber: {
      type: String,

      unique: true,
    },
    password: {
      type: String,
    },
    addressLine1: {
      type: String,
    },
    addressLine2: String,
    state: String,
    district: String,
    village: String,
    taluka: String,
    otp: String,
  },
  { timestamps: true } 
);

module.exports = mongoose.model("User", userSchema);
