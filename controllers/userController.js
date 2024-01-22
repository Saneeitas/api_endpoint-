// src/controllers/userController.js
const User = require("../models/User");
const authService = require("../services/authService");

const register = (req, res) => {
  res.send("Register")
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
