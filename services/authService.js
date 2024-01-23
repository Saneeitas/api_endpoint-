const jwt = require("jsonwebtoken");

const generateToken = (userId) => {

  const expiresIn = "90d";


  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn });
};

module.exports = {
  generateToken,
};
