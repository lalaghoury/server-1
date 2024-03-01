const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const userModel = require("../schemas/UserSchema");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// Login route
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found", success: false });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res
        .status(401)
        .json({ message: "Invalid password", success: false });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
    res.cookie("token", token, { httpOnly: true });
    res.json({
      success: true,
      message: "Login Successful",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        saves: user.saves,
        userimage: user.userimage,
        newsletter: user.newsletter,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
