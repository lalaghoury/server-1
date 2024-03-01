const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const { requireSignin } = require("../middlewares/authMiddleware");

// Get all blog posts
router.get("/", blogController.getAllPosts);

// Get a single blog post by id
router.get("/:id", blogController.getPostById);

// Create a new blog post
router.post("/", requireSignin, blogController.createPost);

// Update a blog post by id
router.put("/:id", requireSignin, blogController.updatePost);

// Delete a blog post by id
router.delete("/:id", requireSignin, blogController.deletePost);

// Get a single blog only by author
router.get(
  "/:blogId/authorship",
  requireSignin,
  blogController.checkBlogByAuthor
);

module.exports = router;
