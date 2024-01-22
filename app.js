/** @format */
require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose')


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const methodOverride = require('method-override');
app.use(methodOverride('_method'));


mongoose.set("strictQuery", true);
mongoose.connect("mongodb://localhost:27017/api-endpointDB")
  .then(() => {
    console.log("Connected to the database");
  })
  .catch(err => {
    console.error("Error connecting to the database:", err);
  });




app.get('/', (req, res) => {
    console.log("Hello API")
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
