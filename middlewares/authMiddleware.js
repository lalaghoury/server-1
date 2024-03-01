const userModel = require("../schemas/UserSchema");

const JWT = require("jsonwebtoken");

const requireSignin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Bearer token

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decode = JWT.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decode;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ message: "Invalid token", status: false, error });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role === 1) {
      next();
    } else {
      return res.status(401).send("Unauthorized");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { requireSignin, isAdmin };
