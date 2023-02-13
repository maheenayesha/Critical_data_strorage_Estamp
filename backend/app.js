const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const userRoutes = require('./api/routes/user');
const dataRoutes = require('./api/routes/dataR');
const locationRoutes = require('./api/routes/locationR');
const firRoutes = require('./api/routes/firs');
require('dotenv').config()
mongoose.connect(
 // "mongodb://localhost:27017/thesis", {
  "mongodb://localhost:27017/thesis",{ 
 useMongoClient: true
},function(error){
  if(error) console.log(error);
else    console.log("connection successful");
});
mongoose.Promise = global.Promise;

app.use(morgan("dev")); 
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  // );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/user", userRoutes);
app.use("/data", dataRoutes);
app.use("/location", locationRoutes);
app.use("/fir", firRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;