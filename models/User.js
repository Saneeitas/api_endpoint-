const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  dateAdded: { type: Date, default: Date.now },
  posts: [postSchema], // Establishing a one-to-many relationship with posts
});

// Hash the password before saving it to the database
userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
