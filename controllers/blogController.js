const BlogModel = require("../schemas/BlogSchema");

const blogController = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await BlogModel.find()
        .populate({ path: "user", select: "username userimage _id" })
        .populate({ path: "category", select: "category" });
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getPostById: async (req, res) => {
    try {
      const post = await BlogModel.findById(req.params.id)
        .populate({ path: "user", select: "username userimage _id" })
        .populate({ path: "category", select: "category" });
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).send("Post not found");
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createPost: async (req, res) => {
    const newPost = new BlogModel(req.body);

    try {
      const savedPost = await newPost.save();
      res.status(201).send({
        savedPost,
        success: true,
        message: "Blog created successfully",
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updatePost: async (req, res) => {
    try {
      const updatedPost = await BlogModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json({
        updatedPost,
        success: true,
        message: "Post updated successfully",
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deletePost: async (req, res) => {
    try {
      const deletedPost = await BlogModel.findByIdAndDelete(req.params.id);
      if (deletedPost) {
        res.status(200).json({
          message: "Post deleted successfully",
          success: true,
          deletedPost,
        });
      } else {
        res.status(404).send("Post not found");
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  checkBlogByAuthor: async (req, res) => {
    try {
      const post = await BlogModel.find({ _id: req.params.blogId });

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      if (req.user._id !== post._id) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      res.status(200).json({
        post,
        author: true,
        success: true,
        mesage: "Welcome Dear Author",
      });
    } catch (error) {
      res.status(500).json({ message: error.message, success: false, error });
    }
  },
};

module.exports = blogController;
