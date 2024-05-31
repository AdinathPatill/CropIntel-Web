const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
  updateUser,
  deleteUser,
  getUserById,
  verifyOtp,
} = require("../controllers/userController");

router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);
router.get("/getUsers", getUsers);
router.get("/getUserById/:id", getUserById);
router.put("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);
router.post("/verifyOtp", verifyOtp);

module.exports = router;
