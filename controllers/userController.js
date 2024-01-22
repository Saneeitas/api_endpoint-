const bcrypt = require("bcrypt");
const User = require("../models/User");
const authService = require("../services/authService");

const register = async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;

    const lowercaseUsername = username.toLowerCase();

    const existingUser = await User.findOne({ username: lowercaseUsername });

    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const newUser = new User({
      firstName,
      lastName,
      username: lowercaseUsername,
      password,
    });
    await newUser.save();

    const token = authService.generateToken(newUser._id);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Both username and password are required" });
    }

    const lowercaseUsername = username.toLowerCase();

    const user = await User.findOne({ username: lowercaseUsername });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = authService.generateToken(user._id);

    res.json({
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        dateAdded: user.dateAdded,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getUsers = (req, res) => {
  res.send("get users");
};

module.exports = {
  login,
  getUsers,
  register,
};
