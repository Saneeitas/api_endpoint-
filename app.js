/** @format */
require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
require("./config/db")
const userRoutes = require("./routes/user.routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("App is running");
});

app.use("/api", userRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
