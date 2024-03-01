const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { requireSignin } = require("../middlewares/authMiddleware");

// User GET all route
router.get("/", userController.getAllUsers);

// Single User GET route
router.get("/:id", userController.getUserById);

// Single User POST route
router.post("/", requireSignin, userController.createUser);

// Single User PUT route
router.put("/:id", userController.updateUser);

// Change Password Route
router.put(
  "/:id/change-password",
  requireSignin,
  userController.changePassword
);

// Single User DELETE route
router.delete("/:id", requireSignin, userController.deleteUser);

// Add recipe to user's wishlist
router.post(
  "/addToWishlist/:userID/:recipeID",
  requireSignin,
  userController.addToWishlist // Corrected typo from 'addToWishlish' to 'addToWishlist'
);

// Remove recipe from user's wishlist
router.post(
  "/removeFromWishlist/:userID/:recipeID",
  requireSignin,
  userController.removeFromWishlist // Assuming 'removeFromWishlist' is correct; corrected to match naming convention
);

// Add Follower
router.put("/:id/follow", requireSignin, userController.addFollower);
// Remove Follower
router.put("/:id/unfollow", requireSignin, userController.removeFollower);

// Get Follow Status
router.get("/:id/follow-status", requireSignin, userController.getFollowStatus);

module.exports = router;
