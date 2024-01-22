// src/controllers/userController.js
const User = require("../models/User");
const authService = require("../services/authService");

const register = async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Create a new user
    const newUser = new User({ firstName, lastName, username, password });
    await newUser.save();

    // Generate a JWT token for the new user
    const token = authService.generateToken(newUser._id);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const login = (req, res) => {
  
res.send("login")
};

const getUsers = (req, res) => {

  res.send("get users")
  
};

module.exports = {
  login,
  getUsers,
  register
};
