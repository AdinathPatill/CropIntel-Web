const User = require("../models/userModel");
const randomstring = require("randomstring");

const registerUser = async (req, res) => {
  try {
    const {
      fullname,
      mobileNumber,
      password,
      addressLine1,
      addressLine2,
      state,
      district,
      village,
      taluka,
    } = req.body;

    let user = await User.findOne({ mobileNumber });

    if (!user) {
      user = await User.create({
        fullname,
        mobileNumber,
        password,
        addressLine1,
        addressLine2,
        state,
        district,
        village,
        taluka,
      });

      res.json({ success: true, message: "User registered successfully" });
    } else {
      res.status(400).json({ success: false, message: "User already exists" });
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { mobileNumber } = req.body;

    let user = await User.findOne({ mobileNumber });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const otp = generateOTP();
    user.otp = otp;
    await user.save();

    sendOTPToUser(mobileNumber, otp);

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { mobileNumber, enteredOtp } = req.body;

    let user = await User.findOne({ mobileNumber });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    console.log("Entered OTP:", enteredOtp); // Add this logging statement

    if (user.otp === enteredOtp) {
      console.log("Stored OTP:", user.otp); // Add this logging statement
      user.otp = null;
      await user.save();
      res.json({ success: true, message: "OTP verified successfully" });
    } else {
      res.status(400).json({ success: false, message: "Incorrect OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


function generateOTP() {
  return randomstring.generate({
    length: 6,
    charset: "numeric",
  });
}

function sendOTPToUser(mobileNumber, otp) {
  console.log(`Sending OTP ${otp} to ${mobileNumber}`);
}

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  updateUser,
  deleteUser,
  getUserById,
  verifyOtp,
};
