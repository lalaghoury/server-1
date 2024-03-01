const Comment = require("../model/Comment");
const BlogModel = require("../schemas/BlogSchema");
const RecipeModel = require("../schemas/RecipeSchema");

const populateReplies = async (comment) => {
  try {
    await comment.populate("replies");
    await comment.populate({
      path: "author",
      select: "username userimage _id",
    });
    for (const reply of comment.replies) {
      await populateReplies(reply);
    }
  } catch (error) {
    console.error("Error populating replies:", error);
    throw error; // Rethrow the error to handle it further up the call stack, if necessary.
  }
};

const commentController = {
  createComment: async (req, res) => {
    const { relatedTo, author, content, model, onModel } = req.body;
    const newComment = new Comment({
      relatedTo,
      author,
      content,
      onModel,
    });

    const Model = onModel === "Recipe" ? RecipeModel : BlogModel;

    try { 
      const savedComment = await newComment.save();
      await Model.findByIdAndUpdate(relatedTo, {
        $push: { comments: savedComment._id },
      });

      res.status(201).json(savedComment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getCommentsByPostId: async (req, res) => {
    try {
      let comments = await Comment.find({ relatedTo: req.params.postId });
      for (const comment of comments) {
        await populateReplies(comment);
      }
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllComments: async (req, res) => {
    try {
      const comments = await Comment.find();
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getSingleComment: async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      res.json(comment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateComment: async (req, res) => {
    try {
      const updatedComment = await Comment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedComment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      res.json(updatedComment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  replyComment: async (req, res) => {
    const { author, content } = req.body;

    const newComment = new Comment({
      author,
      content,
    });

    try {
      const comment = await Comment.findById(req.params.id);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      const savedComment = await newComment.save();

      // const savedComment = await newComment.save();
      comment.replies.push(savedComment._id);
      const updatedComment = await comment.save();
      res.json(updatedComment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteComment: async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      // Delete all replies of the comment using $in operator
      await Comment.deleteMany({ _id: { $in: comment.replies } });

      //Delete the Comment referrence from model
      if (comment.onModel === "Recipe") {
        await RecipeModel.findByIdAndUpdate(comment.relatedTo, {
          $pull: { comments: comment._id },
        });
      } else if (comment.onModel === "Blog") {
        await BlogModel.findByIdAndUpdate(comment.relatedTo, {
          $pull: { comments: comment._id },
        });
      }

      // Delete the comment itself
      await Comment.findByIdAndDelete(req.params.id);

      res.json({ message: "Comment and all its replies deleted successfully" });
    } catch (error) {
      console.error("Error deleting comment:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = commentController;
