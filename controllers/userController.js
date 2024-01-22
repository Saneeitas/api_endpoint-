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

const getUsers = async (req, res) => {
  try {
    const { dateAdded, firstName, lastName } = req.query;

    // Construct a filter object based on provided options
    const filter = {};
    if (dateAdded) {
      // Check if the dateAdded parameter is a valid ISO 8601 date
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateAdded)) {
        const startDate = new Date(dateAdded);
        const endDate = new Date(dateAdded);
        endDate.setDate(endDate.getDate() + 1);

        filter.dateAdded = { $gte: startDate, $lt: endDate };
      } else {
        return res
          .status(400)
          .json({ error: "Invalid date format for dateAdded" });
      }
    }
    if (firstName) {
      filter.firstName = new RegExp(firstName, "i");
    }

    if (lastName) {
      filter.lastName = lastName;
    }

    // Fetch users based on the constructed filter
    const users = await User.find(filter, "-password");

    if (users.length === 0) {
      return res.status(404).json({ error: "No user records found" });
    }

    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  login,
  getUsers,
  register,
};
