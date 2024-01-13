const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const connectDatabase = require("./databases/init.database");
const { checkOverLoad } = require("./helpers/check.connect");

const app = express();

// init middlewares
app.use(morgan("combined"));
app.use(helmet());
app.use(compression());

// init DB
connectDatabase("postgresql");

// Log
checkOverLoad();

// init routes
app.get("/", (req, res, next) => {
  return res.status(200).json("Welcome to my E-Commerce");
});

// handling errors

module.exports = app;
