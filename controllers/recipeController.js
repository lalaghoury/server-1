const RecipeModel = require("../schemas/RecipeSchema");
const CategoryModel = require("../schemas/CategorySchema");
const userModel = require("../schemas/UserSchema");

const recipeController = {
  createRecipe: async (req, res) => {
    try {
      const newRecipe = await RecipeModel.create({
        user: req.user.userId,
        ...req.body,
      });

      if (req.user) {
        await userModel.updateOne(
          { _id: req.user.userId },
          { $push: { recipes: newRecipe._id } }
        );
      }

      if (req.body.category) {
        await CategoryModel.updateOne(
          { _id: req.body.category },
          { $push: { recipes: newRecipe._id } }
        );
      }

      res.status(201).send({
        newRecipe,
        message: "Recipe created successfully",
        success: true,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Internal Server Error",
        success: false,
        error,
      });
    }
  },

  getAllRecipes: async (req, res) => {
    try {
      const recipes = await RecipeModel.find()
        .populate({
          path: "user",
          select: "username userimage _id saves",
        })
        .populate({
          path: "category",
          select: "categoryname categoryimage _id",
        });
      res.status(200).json(recipes);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Internal Server Error", success: false, error });
    }
  },

  getRecipeById: async (req, res) => {
    const { recipeID } = req.params;
    try {
      const recipe = await RecipeModel.findById(recipeID)
        .populate("user")
        .populate("category");
      if (!recipe) {
        return res
          .status(404)
          .send({ message: "Recipe not found", success: false });
      }
      res.status(200).json({ recipe, success: true, message: "Recipe found" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Internal Server Error", success: false, error });
    }
  },

  getRecipeByUserSaves: async (req, res) => {
    try {
      const user = await userModel.findById(req.user.userId).populate({
        path: "saves",
      });

      console.log(user);

      res.status(200).json({ user, success: true });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Internal Server Error", success: false, error });
    }
  },

  updateRecipe: async (req, res) => {
    try {
      const updatedRecipe = await RecipeModel.findByIdAndUpdate(
        req.params.recipeID,
        req.body,
        { new: true }
      );

      if (!updatedRecipe) {
        return res
          .status(404)
          .send({ message: "Recipe not found", success: false });
      }

      res.status(200).json({
        updatedRecipe,
        success: true,
        message: "Recipe updated successfully",
      });
    } catch (error) {
      res
        .status(400)
        .send({ message: "Internal Server Error", success: false, error });
    }
  },

  deleteRecipe: async (req, res) => {
    try {
      const deletedRecipe = await RecipeModel.findByIdAndDelete(
        req.params.recipeID
      );
      res.status(200).send({
        message: "Recipe deleted successfully",
        success: true,
        deletedRecipe,
      });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Internal Server Error", success: false, error });
    }
  },

  checkRecipeByAuthor: async (req, res) => {
    try {
      const recipe = await RecipeModel.find({ _id: req.params.recipeId });

      if (!recipe) {
        return res.status(404).json({ message: "Post not found" });
      }
      if (req.user._id !== recipe._id) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      res.status(200).json({
        recipe,
        author: true,
        success: true,
        mesage: "Welcome Dear Author",
      });
    } catch (error) {
      res.status(500).json({ message: error.message, success: false, error });
    }
  },
};

module.exports = recipeController;
