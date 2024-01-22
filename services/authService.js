const jwt = require("jsonwebtoken");

const JWT_SECRET = "api_endpoint_secret";

const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET);
};

module.exports = {
  generateToken,
};
