const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const userModel = require("../schemas/UserSchema");

// Signup route
router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Check if the user already exists by email or username
    const existingUser = await userModel.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      if (existingUser.email === email) {
        return res
          .status(400)
          .json({ message: "Email already exists", success: false });
      }
      if (existingUser.username === username) {
        return res
          .status(400)
          .json({ message: "Username already exists", success: false });
      }
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      success: true,
      username: newUser.username,
      email: newUser.email,
      message: "Account created successfully",
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error,
    });
  }
});

module.exports = router;
