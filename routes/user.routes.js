const express = require("express");
const router = express.Router();
const userModel = require("../models/userSchema.js");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken')

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: "Error comparing passwords" });
      }

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Successful login
        let token = jwt.sign({email:user.email},"secretKey")
        res.cookie("token" ,token)
      return res.json({ message: "Login successful", user: { id: user._id, name: user.name, email: user.email } });
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
});





router.post("/signup", (req, res) => { 
  try {
    const { name, email, password } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        var createdUser = await userModel.create({
          name,
          email,
          password: hash,
        });
        console.log(createdUser);
        let token = jwt.sign({email},"secretKey")
        res.cookie("token" ,token)
        res.json({ message: "User Created Sucessfully", data: createdUser });
      });
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error while creating User" });
  }
});

module.exports = router;
