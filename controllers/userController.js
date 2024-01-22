const bcrypt = require("bcrypt");
const User = require("../models/User");
const authService = require("../services/authService");

const register = async (req, res, next) => {
  try {
    const { firstName, lastName, username, password } = req.body;

     if (!firstName || !username || !username || !password) {
       return res.status(400).json({ error: "All fields are required" });
     }
    // Validate username using a regular expression (alphanumeric characters only)
    const isAlphanumeric = /^[a-zA-Z0-9]+$/.test(username);
    if (!isAlphanumeric) {
      return res.status(400).json({ error: "Invalid username format" });
    }

    // Validate first name using a regular expression (allow letters and spaces)
    const isValidFirstName = /^[a-zA-Z\s]+$/.test(firstName);
    if (!isValidFirstName) {
      return res.status(400).json({ error: "Invalid first name format" });
    }

    // Validate last name using a regular expression (allow letters and spaces)
    const isValidLastName = /^[a-zA-Z\s]+$/.test(lastName);
    if (!isValidLastName) {
      return res.status(400).json({ error: "Invalid last name format" });
    }

    // Validate password using a regular expression (at least 6 characters)
    const isValidPassword = /.{6,}/.test(password);
    if (!isValidPassword) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

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
    next(error);
  }
};

const login = async (req, res, next) => {
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
    next(error);
  }
};

const getUsersExact = async (req, res, next) => {
  try {
    const { dateAdded, firstName, lastName } = req.query;

    // Construct a filter object based on provided options
    const filter = {};

    if (dateAdded) {
      // Check if the dateAdded parameter is a valid ISO 8601 date
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateAdded)) {
        // If it's a valid date, construct a date range for the day
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
      filter.firstName = firstName;
    }

    if (lastName) {
      filter.lastName = lastName;
    }

    const users = await User.find(filter, "-password");

    if (users.length === 0) {
      return res.status(404).json({ error: "No user records found" });
    }

    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getUsersRegex = async (req, res, next) => {
  try {
    const { dateAdded, firstName, lastName } = req.query;

    // Construct a filter object based on provided options
    const filter = {};

    if (dateAdded) {
      // Check if the dateAdded parameter is a valid ISO 8601 date
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateAdded)) {
        // If it's a valid date, construct a date range for the day
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
      filter.lastName = new RegExp(lastName, "i");
    }

    // Fetch users based on the constructed filter
    const users = await User.find(filter, "-password");

    if (users.length === 0) {
      return res.status(404).json({ error: "No user records found" });
    }

    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getUsersByDateAdded = async (req, res, next) => {
  try {
    const { dateAdded } = req.query;

    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateAdded)) {
      return res
        .status(400)
        .json({ error: "Invalid date format for dateAdded" });
    }

    const startDate = new Date(dateAdded);
    const endDate = new Date(dateAdded);
    endDate.setDate(endDate.getDate() + 1);

    const filter = { dateAdded: { $gte: startDate, $lt: endDate } };

    const users = await User.find(filter, "-password");

    if (users.length === 0) {
      return res.status(404).json({ error: "No user records found" });
    }

    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getUsersByFirstName = async (req, res, next) => {
  try {
    const { firstName } = req.query;

    const filter = firstName ? { firstName: new RegExp(firstName, "i") } : {};

    const users = await User.find(filter, "-password");

    if (users.length === 0) {
      return res.status(404).json({ error: "No user records found" });
    }

    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getUsersByLastName = async (req, res, next) => {
  try {
    const { lastName } = req.query;

    const filter = lastName ? { lastName: new RegExp(lastName, "i") } : {};

    const users = await User.find(filter, "-password");

    if (users.length === 0) {
      return res.status(404).json({ error: "No user records found" });
    }

    res.json(users);
  } catch (error) {
    next(error);
  }
};

const addPostToUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { title, content } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.posts.push({ title, content });
    await user.save();

    res.json(user.posts);
  } catch (error) {
    next(error);
  }
};

const getUsersWithPosts = async (req, res, next) => {
  try {
    const usersWithPosts = await User.find()
      .populate("posts", "-_id")
      .select("-password");

    if (usersWithPosts.length === 0) {
      return res.status(404).json({ error: "No user records found" });
    }

    res.json(usersWithPosts);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  register,
  getUsersRegex,
  getUsersExact,
  getUsersByDateAdded,
  getUsersByFirstName,
  getUsersByLastName,
  addPostToUser,
  getUsersWithPosts,
};
