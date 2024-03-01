const bcrypt = require("bcryptjs");
const RecipeModel = require("../schemas/RecipeSchema");
const BlogModel = require("../schemas/BlogSchema");
const UserModel = require("../schemas/UserSchema"); // corrected variable name
const NewsletterModel = require("../schemas/newsletterSchema");

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await UserModel.find()
        .populate("recipes")
        .populate("blogs");
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id)
        .populate({
          path: "recipes",
          populate: {
            path: "user",
            select: "username userimage",
          },
        })
        .populate("blogs");
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  createUser: async (req, res) => {
    try {
      const user = await UserModel.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  deleteUser: async (req, res) => {
    try {
      const user = await UserModel.findByIdAndDelete(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  addToWishlist: async (req, res) => {
    const { userID, recipeID } = req.params;
    try {
      const user = await UserModel.findById(userID);
      const recipe = await RecipeModel.findById(recipeID);

      if (!user) {
        console.error(`User with ID ${userID} not found`);
        return res
          .status(404)
          .send({ message: "User not found", success: false, error: true });
      }
      if (!recipe) {
        console.error(`Recipe with ID ${recipeID} not found`);
        return res.status(404).send("Recipe not found");
      }

      if (user.saves.includes(recipeID)) {
        console.error(
          `Recipe with ID ${recipeID} is already in the user's wishlist`
        );
        return res.status(409).send({
          message: "Recipe is already in the wishlist",
          success: false,
          error: true,
        });
      }

      if (recipe.saves.includes(userID)) {
        console.error(
          `User with ID ${userID} is already in the recipe's saves`
        );
        return res.status(409).send({
          message: "User is already in the recipe's saves",
          success: false,
          error: true,
        });
      }

      user.saves.push(recipeID);
      recipe.saves.push(userID);

      await recipe.save();
      await user.save();

      res.status(200).send({
        message: "Recipe added to wishlist successfully",
        success: true,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Internal Server Error",
        success: false,
        error: true,
      });
    }
  },

  removeFromWishlist: async (req, res) => {
    const { recipeID, userID } = req.params;
    try {
      const user = await UserModel.findById(userID);
      const recipe = await RecipeModel.findById(recipeID);

      // Check if user and recipe are found
      if (!user) {
        console.error(`User with ID ${userID} not found`);
        return res
          .status(404)
          .send({ message: "User not found", success: false });
      }
      if (!recipe) {
        console.error(`Recipe with ID ${recipeID} not found`);
        return res
          .status(404)
          .send({ message: "Recipe not found", success: false });
      }

      // Check if recipe is in the user's wishlist and if user is in the recipe's saves
      if (!user.saves.includes(recipe._id)) {
        console.error(
          `Recipe with ID ${recipeID} is not in the user's wishlist`
        );
        return res.status(409).send({
          message: "Recipe is not in the wishlist",
          success: false,
        });
      }
      if (!recipe.saves.includes(user._id)) {
        console.error(`User with ID ${userID} is not in the recipe's saves`);
        return res.status(409).send({
          message: "User is not in the recipe's saves",
          success: false,
        });
      }

      // Remove userID from recipe's saves array
      recipe.saves = recipe.saves.filter((id) => id.toString() !== userID);
      // Remove recipeID from user's saves array
      user.saves = user.saves.filter((id) => id.toString() !== recipeID);

      await recipe.save();
      await user.save();

      res.status(200).send({
        message: "Recipe removed from wishlist successfully",
        success: true,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Internal Server Error", success: false, error });
    }
  },

  changePassword: async (req, res) => {
    const { email, password, newPassword } = req.body;
    try {
      const user = await UserModel.findById(req.params.id);

      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found", success: false });
      }

      if (user.email !== email) {
        return res
          .status(404)
          .json({ message: "Email is incorrect", success: false });
      }

      const isNewMatch = await bcrypt.compare(newPassword, user.password);
      if (isNewMatch) {
        return res.status(401).json({
          message: "Password cannot be the same as old password",
          success: false,
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Incorrect password", success: false });
      }

      user.password = await bcrypt.hash(newPassword, 10); // Hash the new password
      await user.save();

      return res.status(200).json({
        message: "Password changed successfully",
        success: true,
        user,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },

  updateUser: async (req, res) => {
    const { id } = req.params;

    try {
      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!user) {
        return res.status(404).send({
          message: "User not found",
          success: false,
        });
      }
      res.status(200).json({
        user,
        success: true,
        message: "User updated successfully",
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

  addFollower: async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id);
      const reqUser = await UserModel.findById(req.user.userId);

      if (!user) {
        return res.status(404).send({
          message: "User not found",
          success: false,
        });
      }
      if (!reqUser) {
        return res.status(404).send({
          message: "User not found",
          success: false,
        });
      }

      if (user.followers.includes(req.user.userId)) {
        console.error(
          `User with ID ${req.user.userId} is already in the user's Followers List`
        );
        return res.status(409).send("User is already in the Following");
      }
      if (reqUser.following.includes(req.user.userId)) {
        console.error(`User with ID ${req.user.userId} is already  Following.`);
        return res.status(409).send("User is already in the Following");
      }

      user.followers.push(req.user.userId);
      reqUser.following.push(req.user.userId);

      await user.save();
      await reqUser.save();

      res.status(200).json({
        success: true,
        message: "User followed successfully",
        following: user.followers.includes(req.user.userId),
        followingCount: user.followers.length,
      });
    } catch (error) {
      console.error(error);
    }
  },

  removeFollower: async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id);
      const reqUser = await UserModel.findById(req.user.userId);

      if (!user) {
        return res.status(404).send({
          message: "User not found",
          success: false,
        });
      }
      if (!reqUser) {
        return res.status(404).send({
          message: "User not found",
          success: false,
        });
      }

      if (!user.followers.includes(req.user.userId)) {
        console.error(
          `User with ID ${req.user.userId} is not in the user's Followers List`
        );
        return res.status(409).send("User is not in the Following");
      }
      if (!reqUser.following.includes(req.user.userId)) {
        console.error(`User with ID ${req.user.userId} is not Following.`);
        return res.status(409).send("User is not in the Following");
      }

      user.followers.pull(req.user.userId);
      reqUser.following.pull(req.user.userId);

      await user.save();
      await reqUser.save();

      res.status(200).json({
        success: true,
        message: "User Unfollowed successfully",
        following: user.followers.includes(req.user.userId),
        followingCount: user.followers.length,
      });
    } catch (error) {
      res.status(500).send({
        error,
        message: "Internal Server Error",
        success: false,
      });
    }
  },

  getFollowStatus: async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id);

      if (!user) {
        return res.status(404).send({
          message: "User not found",
          success: false,
        });
      }

      if (user.followers.includes(req.user.userId)) {
        return res.status(200).send({
          success: true,
          following: true,
        });
      }
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = userController;
