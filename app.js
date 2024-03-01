const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const path = require("path");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// Middlewares

///////////////////////////////////////////////////////////////////////////////

// CORS
const useCors = require("./middlewares/cors");
useCors(app);

// Cookie Parser
const useCookieParser = require("./middlewares/cookie-parser");
useCookieParser(app);

// Body Parser
const useBodyParser = require("./middlewares/bodyParser");
useBodyParser(app);

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "client", "build")));

///////////////////////////////////////////////////////////////////////////////

// Routes

///////////////////////////////////////////////////////////////////////////////

// Home Route
const homeRouter = require("./routes/home");
app.use("/api/", homeRouter);

// Verify Route
const verifyRouter = require("./routes/verify");
app.use("/api/verify", verifyRouter);

// Recipe Route
const recipeRouter = require("./routes/recipe");
app.use("/api/recipe", recipeRouter);

// Blog Route
const blogRouter = require("./routes/blog");
app.use("/api/blog", blogRouter);

// Image Route
const imageRouter = require("./routes/image");
app.use("/api/image", imageRouter);

// Login Route
const loginRouter = require("./routes/login");
app.use("/api/login", loginRouter);

// Signup Route
const signupRouter = require("./routes/signup");
app.use("/api/signup", signupRouter);

// User Route
const userRouter = require("./routes/user");
app.use("/api/user", userRouter);

// Category Route
const categoryRouter = require("./routes/category");
app.use("/api/category", categoryRouter);

// Signout Route
const signoutRouter = require("./routes/signout");
app.use("/api/signout", signoutRouter);

//Comments Route
const commentsRouter = require("./routes/comment");
app.use("/api/comments", commentsRouter);

// Newsletter Route
const newsletterRouter = require("./routes/newsletter");
app.use("/api/newsletter", newsletterRouter);

///////////////////////////////////////////////////////////////////////////////

// Catch-all route to serve index.html for any other route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

///////////////////////////////////////////////////////////////////////////////

// Connect to database and  Listen
app.listen(PORT, () => {
  const db = require("./model/db");
  db();
  console.log(`Server is running on port ${PORT}`);
});
