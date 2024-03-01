const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  relatedTo: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "onModel",
  },
  onModel: {
    type: String,
    enum: ["Blog", "Recipe"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
    ref: "User",
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
