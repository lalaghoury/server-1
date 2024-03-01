const express = require("express");
const router = express.Router();
const newsletterController = require("../controllers/newsletterController");
const { requireSignin } = require("../middlewares/authMiddleware");

// Subscribe to newsletter
router.post("/subscribe", newsletterController.subscribeToNewsletter);

// Unsubscribe from newsletter
router.post(
  "/unsubscribe",
  requireSignin,
  newsletterController.unsubscribeFromNewsletter
);

// Get all newsletters
router.get("/", newsletterController.getAllNewsletters);

module.exports = router;
