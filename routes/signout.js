const express = require("express");
const router = express.Router();

// Use a GET request for logout
router.get("/", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Successfully logged out.", success: true });
});

module.exports = router;
