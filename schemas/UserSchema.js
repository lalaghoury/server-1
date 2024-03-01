const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    userimage: {
      type: String,
      default: "https://i.ibb.co/yhrMpQz/s-homepage-recipe-row-user-icon.png",
    },
    userbigimage: {
      type: String,
      default:
        "http://res.cloudinary.com/dslrkvmwn/image/upload/v1707222135/images/sgdqeq8z9fiwpkdiwo54.png",
    },
    recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
    blogs: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
    saves: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
    role: { type: Number, default: 0 },
    bio: {
      type: String,
      default:
        "Hello welcome to my page , I hope you enjoy the recipes I created",
    },
    newsletter: { type: Boolean, default: false },
    fullname: { type: String, default: "John Doe" },
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    collections: [{ type: String }],
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
