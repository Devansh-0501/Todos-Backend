const jwt = require("jsonwebtoken");
const userModel = require("../models/userSchema");

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "No token, access denied" });

    const decoded = jwt.verify(token, "secretKey");
    const user = await userModel.findOne({ email: decoded.email });

    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user; // Attach user to request
    next(); // Proceed to route
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authenticateUser;
