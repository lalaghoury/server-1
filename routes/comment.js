const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

// Create a new comment
router.post("/", commentController.createComment);

// Get all comments by post ID
router.get("/:postId", commentController.getCommentsByPostId);

// Get all comments
router.get("/", commentController.getAllComments);

// Get a single comment
router.get("/:id", commentController.getSingleComment);

// Update a comment
router.put("/:id", commentController.updateComment);

// Reply to a comment
router.post("/:id/reply", commentController.replyComment);

// Delete a comment
router.delete("/:id", commentController.deleteComment);



module.exports = router;
