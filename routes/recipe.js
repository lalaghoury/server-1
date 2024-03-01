const express = require("express");
const router = express.Router();

// Import the RecipeModel
const { requireSignin } = require("../middlewares/authMiddleware");
const recipeController = require("../controllers/recipeController");

// POST route to create a new recipe
router.post("/", requireSignin, recipeController.createRecipe);

// GET route to retrieve all recipes
router.get("/", recipeController.getAllRecipes);

router.get("/saved", requireSignin, recipeController.getRecipeByUserSaves);

// GET route to retrieve a single recipe by ID
router.get("/:recipeID", recipeController.getRecipeById);

// PUT route to update a recipe by ID
router.put("/:recipeID", requireSignin, recipeController.updateRecipe);

// DELETE route to delete a recipe by ID
router.delete("/:recipeID", requireSignin, recipeController.deleteRecipe);

// Get a single recipe only by author
router.get(
  "/:recipeId/authorship",
  requireSignin,
  recipeController.checkRecipeByAuthor
);

module.exports = router;
